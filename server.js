/* global process */

import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { promises as fs, readFileSync } from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envFile = path.join(__dirname, '.env')
const submissionsFile = path.join(__dirname, 'data', 'submissions.json')

loadEnvironmentFile()

const port = process.env.PORT || 3001

function loadEnvironmentFile() {
  try {
    const fileContents = readFileSync(envFile, 'utf8')

    for (const line of fileContents.split('\n')) {
      const trimmedLine = line.trim()

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue
      }

      const separatorIndex = trimmedLine.indexOf('=')

      if (separatorIndex === -1) {
        continue
      }

      const key = trimmedLine.slice(0, separatorIndex).trim()
      const rawValue = trimmedLine.slice(separatorIndex + 1).trim()
      const value = rawValue.replace(/^['"]|['"]$/g, '')

      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Failed to read .env file:', error)
    }
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
  })
  response.end(JSON.stringify(payload))
}

function validateEstimate({ name, phone, message }) {
  if (!name) {
    return 'Please enter your name.'
  }

  if (!phone) {
    return 'Please enter your phone number.'
  }

  if (!message) {
    return 'Please enter a short message about your vehicle or repair needs.'
  }

  return null
}

function getEmailConfig() {
  const config = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
  }

  const missingKeys = Object.entries(config)
    .filter(([key, value]) => !['secure', 'user', 'pass'].includes(key) && !value)
    .map(([key]) => key)

  if (missingKeys.length > 0) {
    throw new Error(`Missing email environment variables: ${missingKeys.join(', ')}`)
  }

  if ((config.user && !config.pass) || (!config.user && config.pass)) {
    throw new Error('EMAIL_USER and EMAIL_PASS must both be set when SMTP authentication is required.')
  }

  return config
}

function buildEstimateEmail(submission, emailConfig) {
  return [
    `From: ${emailConfig.from}`,
    `To: ${emailConfig.to}`,
    `Subject: New estimate request from ${submission.name}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    'You received a new estimate request from the website.',
    '',
    `Customer name: ${submission.name}`,
    `Phone number: ${submission.phone}`,
    `Message: ${submission.message}`,
    `Submission timestamp: ${submission.createdAt}`,
    '',
  ].join('\n')
}

function sendSmtpMessage(emailConfig, emailBody) {
  return new Promise((resolve, reject) => {
    const recipients = emailConfig.to
      .split(',')
      .map((recipient) => recipient.trim())
      .filter(Boolean)

    const protocol = emailConfig.secure ? 'smtps' : 'smtp'
    const smtpUrl = `${protocol}://${emailConfig.host}:${emailConfig.port}`
    const curlArgs = [
      '--silent',
      '--show-error',
      '--url',
      smtpUrl,
      '--mail-from',
      emailConfig.from,
    ]

    if (emailConfig.user && emailConfig.pass) {
      curlArgs.push('--user', `${emailConfig.user}:${emailConfig.pass}`)
    }
    for (const recipient of recipients) {
      curlArgs.push('--mail-rcpt', recipient)
    }

    curlArgs.push('--upload-file', '-')

    const curlProcess = spawn('curl', curlArgs)
    let stderr = ''

    curlProcess.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    curlProcess.on('error', reject)

    curlProcess.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(stderr.trim() || `curl exited with code ${code}`))
    })

    curlProcess.stdin.write(emailBody)
    curlProcess.stdin.end()
  })
}

async function sendEmailNotification(submission) {
  const emailConfig = getEmailConfig()
  const emailBody = buildEstimateEmail(submission, emailConfig)

  await sendSmtpMessage(emailConfig, emailBody)
}

async function readSubmissions() {
  try {
    const fileContents = await fs.readFile(submissionsFile, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []
    }

    throw error
  }
}

async function saveSubmission(submission) {
  await fs.mkdir(path.dirname(submissionsFile), { recursive: true })

  const submissions = await readSubmissions()
  submissions.push(submission)

  await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2))
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })

    request.on('error', reject)
  })
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/api/health') {
    sendJson(response, 200, {
      success: true,
      message: 'Estimate server is running.',
    })
    return
  }

  if (request.method === 'POST' && request.url === '/api/estimates') {
    try {
      const body = await readRequestBody(request)
      const submission = {
        name: body.name?.trim() ?? '',
        phone: body.phone?.trim() ?? '',
        message: body.message?.trim() ?? '',
      }

      const validationError = validateEstimate(submission)

      if (validationError) {
        sendJson(response, 400, {
          success: false,
          error: validationError,
        })
        return
      }

      const savedSubmission = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        ...submission,
      }

      await saveSubmission(savedSubmission)

      try {
        await sendEmailNotification(savedSubmission)
      } catch (error) {
        console.error('Failed to send estimate notification email:', error)

        sendJson(response, 201, {
          success: true,
          message: 'Your estimate request was received successfully.',
        })
        return
      }

      sendJson(response, 201, {
        success: true,
        message: 'Your estimate request was sent successfully.',
      })
    } catch (error) {
      if (error.message === 'Invalid JSON body') {
        sendJson(response, 400, {
          success: false,
          error: 'Please send valid JSON data.',
        })
        return
      }

      console.error('Failed to save estimate request:', error)

      sendJson(response, 500, {
        success: false,
        error: 'Something went wrong while sending your request. Please try again.',
      })
    }

    return
  }

  sendJson(response, 404, {
    success: false,
    error: 'Route not found.',
  })
})

server.listen(port, () => {
  console.log(`Estimate server listening on http://localhost:${port}`)
})

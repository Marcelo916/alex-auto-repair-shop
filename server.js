/* global process */

import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = process.env.PORT || 3001
const submissionsFile = path.join(__dirname, 'data', 'submissions.json')

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

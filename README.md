# Alex Auto Repair Shop

This project includes a React + Vite frontend and a simple Node backend for estimate requests.
The backend keeps saving submissions to `data/submissions.json` and can also send email notifications
using SMTP environment variables.

## Install dependencies

```bash
npm install
```

## Create your environment file

Copy `.env.example` to `.env` and fill in your real SMTP values.

```bash
cp .env.example .env
```

Required variables:

- `PORT` - backend port for local development. Default: `3001`
- `EMAIL_HOST` - SMTP host name
- `EMAIL_PORT` - SMTP port, such as `587` or `465`
- `EMAIL_SECURE` - `true` for SMTPS/SSL, `false` for a non-SSL local SMTP server or provider-specific non-SSL SMTP setup
- `EMAIL_USER` - SMTP username if your mail provider requires authentication
- `EMAIL_PASS` - SMTP password if your mail provider requires authentication
- `EMAIL_FROM` - sender email address
- `EMAIL_TO` - business inbox that should receive estimate notifications

## Run the app locally

Run the backend in one terminal:

```bash
npm run server
```

Run the frontend in a second terminal:

```bash
npm run dev
```

The frontend sends estimate requests to `POST /api/estimates`, and Vite proxies that route to the
local backend at `http://localhost:3001` during development.

## How email notifications work

After a valid estimate request is received, the backend:

1. trims and validates the fields
2. saves the request to `data/submissions.json`
3. sends an email notification to `EMAIL_TO`

Each email includes:

- customer name
- phone number
- message
- submission timestamp

If email delivery fails, the backend logs the SMTP error on the server and returns a readable error
message to the frontend without exposing credentials.

## How to test the email feature

1. Start the backend with your `.env` file configured.
2. Submit the Request Estimate form from the website, or send a request directly:

```bash
curl -X POST http://localhost:3001/api/estimates \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jamie Driver","phone":"(831) 111-2222","message":"Need brake inspection."}'
```

3. Confirm that:
   - the request was added to `data/submissions.json`
   - the business inbox in `EMAIL_TO` received the notification email

## Future hosting

This setup is compatible with hosted backends such as Render or Railway. Add the same environment
variables in your hosting dashboard and start the backend with:

```bash
npm run server
```

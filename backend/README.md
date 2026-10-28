# Draftwise API

Express and MongoDB backend for the Draftwise freelance proposal analyzer.

## Setup

From this directory, install dependencies and copy `.env.example` to `.env`. Set `MONGODB_URI`, a long random `JWT_SECRET`, and an OpenAI API key before using protected APIs or AI endpoints.

The default local port is `5001` to avoid the common port-5000 conflict; override it with `PORT` when needed.

```sh
npm install
npm run dev
```

Use `npm start` for production. In local development the server can start without MongoDB configuration so `/api/health` can report `503` with a `degraded` status; database-backed routes return a clear `503`. Production startup requires the MongoDB URI, JWT secret (at least 32 characters), and OpenAI key.

## Routes

- `GET /api/health`
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/profile`, `PATCH /api/profile`
- `POST /api/analyses`, `GET /api/analyses`, `GET /api/analyses/history`, `GET /api/analyses/:id`
- `POST /api/analyses/:id/proposal`
- `POST /api/analyses/:id/interview-questions`

Protected routes require `Authorization: Bearer <token>`. Responses use `{ success, data, message }` or `{ success: false, error }`. AI structured outputs are validated on the server before persistence. The OpenAI key is read only from this backend's environment.

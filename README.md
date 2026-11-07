# ReadAll — Book Catalogue and Ordering Application

ReadAll is a full-stack web application for managing a book catalogue and its core shopping workflow. The repository contains a React frontend and an Express API backed by MongoDB.

## Core modules

- User registration and authentication with JWT-based protected routes.
- Book catalogue and category management.
- Book search and catalogue browsing.
- Shopping cart and order workflows.
- User profile and order-history endpoints.
- Administrative routes for managing catalogue and order records.
- Book-cover upload support through the backend upload middleware.

The repository also includes a development roadmap. Treat roadmap items as planned work unless they are confirmed in the application code; this project is an evolving application, not a production-readiness claim.

## Technology

- **Frontend:** React, Vite, Tailwind CSS and React Router.
- **Backend:** Node.js and Express.
- **Database:** MongoDB with Mongoose.
- **Authentication:** JWT and bcrypt.
- **Supporting services:** Multer for uploads and Nodemailer for email.

## Repository structure

- `client/` — React user interface.
- `server/` — Express API, models, controllers, routes and middleware.
- `roadmap.html` — development roadmap.

## Local development

Start the API in one terminal:

```bash
cd server
npm install
cp .env.example .env
# Configure MongoDB and a strong JWT secret.
npm run dev
```

Start the frontend in a second terminal:

```bash
cd client
npm install
npm run dev
```

Build and lint the frontend:

```bash
cd client
npm run lint
npm run build
```

## Security

Keep MongoDB connection strings, JWT secrets, email credentials and other configuration in local environment files or a deployment secret manager. Do not commit `.env` files, dependency directories or generated build output.

## Project status

This repository does not currently define an automated backend test suite. Verify the application manually in a non-production environment before using it with real users or data.

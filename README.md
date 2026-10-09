# DevTrack API

A production-ready REST API for tracking job and internship applications. Built with Node.js, Express, and MongoDB, featuring JWT authentication, protected routes, and a full CRUD system with analytics.

**Live API:** https://devtrack-backend-1.onrender.com

---

## Features

- **JWT Authentication** - Register and login with secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Protected Routes** - Custom middleware verifies tokens on every request
- **Full CRUD** - Create, read, update, delete job applications
- **Filtering and Search** - Query by status, search by company name
- **Analytics** - Aggregated stats by application status
- **Input Validation** - express-validator on all auth routes
- **Centralized Error Handling** - Consistent JSON error responses
- **Deployed on Render** - With CI/CD from GitHub
- **MongoDB Atlas** - Cloud-hosted database

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Auth | JSON Web Tokens (JWT) |
| Password Hashing | bcryptjs |
| Validation | express-validator |
| Deployment | Render |

---

## Project Structure

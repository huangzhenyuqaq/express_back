# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Express.js REST API server with JWT authentication, MySQL database integration, and CORS support. The application follows a modular architecture with separate directories for routing, controllers, configuration, and utilities.

## Architecture

### Directory Structure
- `app.js` - Main application entry point with middleware setup and route configuration
- `config/` - Database connection and JWT secret key configuration
- `controllers/` - Business logic handlers for API endpoints
- `router/` - Express route definitions
- `utils/` - Utility functions including validation schemas

### Key Components
- **Authentication**: JWT-based authentication with Bearer tokens (5-second expiration for testing)
- **Database**: MySQL connection pool configured in `config/db.js`
- **Validation**: Joi schema validation using `@escook/express-joi` middleware
- **CORS**: Cross-origin resource sharing enabled for all routes
- **Password Hashing**: bcryptjs for secure password storage

### API Structure
- User routes: `/api/v1/user/*` (registration, login, user info)
- Course routes: `/api/v1/course/*` (basic course endpoints)
- Protected endpoints require JWT token except login and registration

## Development Commands

### Starting the Server
```bash
node app.js
```
The server runs on port 3000 and outputs "服务器启动成功" when started successfully.

### Dependencies Management
```bash
npm install          # Install all dependencies
```

### Database Configuration
- Database connection configured in `config/db.js`
- Uses MySQL with connection pooling
- Database schema includes user table with name, pwd (hashed), and head_img columns

## Key Implementation Details

### JWT Token Flow
1. Login/registration returns Bearer token with 5-second expiration
2. Protected routes use `express-jwt` middleware to validate tokens
3. Token verification extracts user info for authenticated requests

### Error Handling
Global error handler in `app.js` handles:
- Joi validation errors
- JWT authentication failures (UnauthorizedError)
- Generic unknown errors

### User Registration
- Validates username (1-6 characters) and password (6-15 characters)
- Checks for duplicate usernames
- Hashes passwords with bcrypt
- Assigns random avatar from predefined list

### Code Conventions
- Uses CommonJS modules (`require`/`module.exports`)
- Consistent error response format: `{code: 1, msg: 'error message'}`
- Success response format: `{code: 0, data/msg: 'result'}`
- Chinese comments and error messages throughout codebase
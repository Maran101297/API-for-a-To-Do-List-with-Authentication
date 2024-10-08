Here’s a more formal version of your project description for documentation:

---

## Project Overview: **Todo App - Sukumaran**

## Overview
The **Todo App** is a Node.js-based application designed to help users manage tasks efficiently. It incorporates user authentication and CRUD operations for task management, ensuring a secure and user-friendly environment.

## Key Features
### 1. User Authentication
- **User Signup and Login**: Users can create accounts and log in to access the system.
- **JWT-based Authentication**: Secure user access through JSON Web Tokens (JWT).
- **Password Security:**: User passwords are hashed before being stored in the database.

### 2.todo Task Management
- **CRUD Operations**: Allows users to create, read, update, and delete tasks.
- **Task Association**: Each task is linked to a specific user, ensuring personalized task management.
- **Pagination with DataTables**: Supports advanced interaction controls for task listings using the DataTables.net package to enhance table functionality, including pagination.

### 3. Middleware
- **Protected Routes**: Implements route protection to ensure that only authenticated users can access task-related endpoints.
- **Input Validation**: Validates all POST and UPDATE requests to ensure data integrity and security.

### API Endpoints
POST /api/signup - Sign up a new user

Request body: { "email": "user@example.com", "password": "password123" }
POST /api/login - Log in an existing user

Request body: { "email": "user@example.com", "password": "password123" }
Response: { "token": "jwt_token" }
POST /api/todos - Create a new task

Request body: { "title": "Buy groceries", "completed": false }
GET /api/todos - List all tasks for the authenticated user

PUT /api/todos/:id - Update a task by ID

Request body: { "title": "Buy groceries", "completed": true }
DELETE /api/todos/:id - Delete a task by ID

### Validation and Error Handling
- **Input Validation**: Email format, task title, and other required fields are validated.
- **Error Handling**: Provides proper error messages for invalid credentials, unauthorized access, and missing fields.

### Project Structure

Follows the MVC (Model-View-Controller) structure for clean, modular, and reusable code.

## Technology Stack
1. **Node.js**: A JavaScript runtime for building server-side applications.
2. **Express.js**: A web framework used for building RESTful APIs.
3. **MongoDB**: A NoSQL database for storing user and task information (utilizing MongoDB's free cloud database).
4. **Mongoose**: An Object Data Modeling (ODM) library for managing MongoDB with Node.js.


## Hosting Information
The sample application has been created and hosted on AWS. Kindly use the following URL to access the Todo app Management System:

Application URL: http://18.234.48.76:7030/api/todo-app

---


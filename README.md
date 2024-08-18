# Task Management System

This is a Task Management System built with Node.js, Express, and MongoDB. The application provides user authentication, task management, and other functionalities.

## Features

- User Registration and Login
- Task Creation, Update, and Inactivation
- JWT-based Authentication
- MongoDB Integration

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- npm (v6 or higher) or Yarn
- MongoDB

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Arunachalam6/TaskManagement.git
   cd TaskManagement

2. **Install the dependencies:**

    bash
    Copy code
    npm install
    or, if you're using Yarn:

    bash
    Copy code
    yarn install
    Create a .env file:

3. **Create a .env file in the root directory and add the following environment variables:**

    env
    Copy code
    MONGO_URI=mongodb://localhost:27017/task_management_db
    JWT_SECRET=your_secret_key
    PORT=5000
    Replace your_secret_key with a strong secret key for JWT.
    Adjust the MONGO_URI if your MongoDB setup is different.

4. **Set Up MongoDB:**

    Ensure MongoDB is running locally or update the MONGO_URI to point to your MongoDB instance.

5. **Running the Application**
    To start the application using nodemon (which automatically restarts the server upon code changes):

    bash
    Copy code
    node server.js 
    The server will start on the port specified in your .env file (default is 5000).
    Visit http://localhost:5000 in your browser or use tools like Postman to interact with the API.

**API Endpoints**

**Auth Routes**

POST /register : Register a new user.

POST /login : Log in a user and receive a JWT token.

**Task Routes**

POST /tasks : Create a new task (Requires Authentication).

GET /tasks : Retrieve all tasks for the logged-in user (Requires Authentication).

PUT /tasks/:id : Update a task by its ID (Requires Authentication).

DELETE /tasks/:id : Set a task's status to "Inactive" by its ID (Requires Authentication).

**Error Handling**

If you encounter any issues, the API will return a JSON response with an appropriate error message and status code.

**Development**

    During development, use nodemon to automatically restart the server on code changes:

    bash
    Copy code
    nodemon server.js
    License
    This project is licensed under the MIT License - see the LICENSE file for details.
Hotel Management System

A Node.js-based API for managing hotel operations, including user authentication, employee management, and menu services. Built with Express, MongoDB, Passport, and JWT for secure access and efficient data handling.

Features:


User Authentication: Login functionality with JWT-based authentication.

Employee Management: Manage and retrieve employee profiles based on work type.

Menu Management: Create, update, and delete menu items.

Logging Middleware: Custom logging for API requests.

Tech Stack:


Backend: Node.js, Express

Database: MongoDB

Authentication: Passport.js, JWT (JSON Web Token)

Others: Mongoose for MongoDB ODM, Bcrypt for password hashing


Setup and Installation:

Clone the Repository

git clone <your-repo-url>

cd hotel

Install Dependencies:

npm install

Environment Configuration: Create a .env file in the root of your project and add the following:

plaintext

PORT=3000

JWT_SECRET=your_jwt_secret

MONGO_URI=mongodb://localhost:27017/hotel

Run MongoDB: Ensure MongoDB is running locally. In a new terminal, start MongoDB:

mongod

Run the Application:


npm start

The server should be running on http://localhost:3000.


API Endpoints :

Authentication

POST /login - Authenticate user and receive JWT.

User (Person)

GET /profile - Retrieve user profile using token.

GET /person/worktype/:worktype - Get employees by work type (e.g., manager, chef).

POST /person - Create a new employee profile.

PUT /person/:id - Update an employee profile.

DELETE /person/:id - Delete an employee profile.

Menu

POST /menu - Add a new menu item.

GET /menu - Retrieve all menu items.

PUT /menu/:id - Update a menu item.

DELETE /menu/:id - Delete a menu item.

Middleware

JWT Middleware: Validates JWT token for secure routes.

Request Logging: Logs incoming API requests with timestamps.

Project Structure:

hotel/

├── models/

│   ├── person.js         # User schema and methods

│   └── menu.js           # Menu schema

├── routes/

│   ├── personroutes.js   # Routes for user operations

│   └── menuroute.js      # Routes for menu operations

├── auth.js               # Passport strategy for authentication

├── db.js                 # MongoDB connection setup

├── server.js             # Entry point to start the app

└── README.md

Error Handling:

Each route has basic error handling, returning 404 or 500 status codes when errors occur. Authentication errors or invalid tokens return appropriate messages.


Future Improvements:

Role-based Access: Restrict access based on user roles.

Enhanced Error Handling: Centralized error handling for cleaner code.

Automated Testing: Implement tests for API routes and authentication.

License:

This project is licensed under the MIT License.

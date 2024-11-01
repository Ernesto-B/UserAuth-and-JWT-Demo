# UserAuth-and-JWT-Demo
Authentication and Authorization API with Node.js, Express, Bcrypt, and JWT

This project demonstrates how to set up a simple API using Node.js and Express for user authentication and authorization using bcrypt for password hashing and JWT (JSON Web Tokens) for protecting routes.

## Setup Instructions

### Prerequisites

- `Node.js` installed on your system
- `npm` (Node Package Manager)
- `Thunder Client` extension for VS Code (or any REST client you prefer, like Postman)

### Installation

1. Clone this repository.
2. Navigate to the project directory and install the dependencies:
   ```bash
   npm install
   ```
3. If not downloaded from the repo, create a `.env` file in the root of the project and add the following environment variables:
   ```env
   ACCESS_TOKEN_SECRET=your_secret_key
   ```
Replace `your_secret_key` with a random string of characters. This will be used to sign the JWT tokens.

## Usage
### Running the server
To start the basic user authentication server, run:
```bash
node basicUserAuth.js
```
The server will run on `http://localhost:3000`.

To run the JWT authentication server, run:
```bash
node jwtAuth.js
```
The server will run on `http://localhost:3001`.

## Endpoints
### Basic User Authentication
- `GET /users` - Returns all users.
- `POST /users` - Create a new user.
- `POST /users/login` - Login a user.

### JWT Authentication
- `GET /posts` - Returns all posts for authenticated user. Requires a valid JWT token in the `Authorization` header of the request.
- `POST /login` - Login a user and get a JWT token.

## Testing
You can test the API using the Thunder Client extension in VS Code or any REST client you prefer. Simply open the `requests.rest` file and click the `Send Request` button over whichever request you want to run.

## Notes
- Make sure to replace the `Authorization: Bearer <your_jwt_token>` in the example requests with an actual token generated from the /login endpoint.
- In a real project, don't commit your `.env` file with sensitive information to version control.
- Implementing refresh tokens is also recommended (not shown in this demo yet... might be added later).
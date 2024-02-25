# Task-Manager-App
## Overview
The Task Management App is a simple RESTful API built with Express.js and MongoDB using Mongoose. It allows users to manage tasks by performing CRUD operations (Create, Read, Update, Delete).


## Setting Up Development Environment


### Prerequisites


* Node.js installed on your machine.
* MongoDB installed locally or accessible via connection string.


### Installation Steps


* Clone the repository from GitHub:

        git clone 'https://github.com/shadowfax29/task.git'


* Navigate to the project directory:
        
        cd task


* Install dependencies:

        npm install


## Running the Application


To run the Task Management App locally, follow these steps:
* Start MongoDB server
        
        mongod
* Start the Node.js server
         
        npm start
The server will run on port 3066 by default.


## Testing the Application


To test the Task Management App, you can use tools like Postman or curl to make HTTP requests to the API endpoints.

Example Request


* Create a task:


        POST http://localhost:3066/tasks

        Body: {
        "title": "Sample Task",
        "description": "This is a sample task",
        "status": "pending"
        }

* Get all tasks:

        GET http://localhost:3066/tasks

* Get a specific task by ID:

        GET http://localhost:3066/tasks/:id

* Update a task by ID:

        PUT http://localhost:3066/tasks/:id
        Body: {
        "title": "Updated Task Title",
        "description": "Updated task description",
        "status": "completed"
        }

* Delete a task by ID:

        DELETE http://localhost:3066/tasks/:id

## Technologies Used
* Node.js

* Express.js

* MongoDB

* Mongoose

## Contributors
**ravi kumar**

**Github:** [Click Here](https://github.com/shadowfax29)

## Get Involved!
We welcome contributions from the community! Whether you've discovered a bug, have an idea for a new feature, or want to improve the existing codebase, we encourage you to get involved.

## How You Can Contribute:

**Submit Pull Requests:**

* Help us enhance the Task Management App by submitting pull requests with your improvements.

**Report Issues:**

* Encountered a bug or have a suggestion? Open an issue and let us know!

**Spread the Word:**

* Share the Task Management App with your network and help us grow our community.

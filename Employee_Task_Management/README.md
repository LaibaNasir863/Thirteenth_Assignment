# Employee Task Management REST API

## 1. Project Description

The Employee Task Management REST API is a backend application developed using Node.js and Express.js following the MVC (Model-View-Controller) architecture.

This application allows a company to manage employee tasks efficiently. Tasks can be created, assigned to employees, updated, tracked, filtered, and deleted.

## 2. Technologies Used

- Node.js
- Express.js
- JavaScript
- REST API
- Postman
- dotenv
- Nodemon

## 3. Project Features

- Create new tasks.
- Get all tasks.
- Get a task by ID.
- Update a complete task using PUT.
- Update selected fields using PATCH.
- Delete a task.
- Filter tasks by status.
- Filter tasks by priority.
- Get task summary.
- Get employee-specific tasks.
- Get overdue tasks.
- Input validation and error handling.
- Automatic unique task ID generation.

## 4. Project Structure

```text
employee-task-management/
├── controllers/
│   └── taskController.js
├── data/
│   └── tasks.js
├── middleware/
│   ├── errorHandler.js
│   └── notFound.js
├── models/
│   └── taskModel.js
├── postMan/
│   └── Employee_Task_Management.postman_collection.json
├── routes/
│   └── taskRoutes.js
├── .env.example
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## 5. Installation

First, clone or download the project repository.

Open the project folder in VS Code and install the required dependencies:

```bash
npm install
```

## 6. Environment Variables

Create a `.env` file in the root directory of the project.

Add the following environment variable:

```env
PORT=5000
```

**Note:** Do not upload your actual `.env` file or any environment secrets to GitHub.

## 7. Run the Project

To start the server in normal mode, run:

```bash
npm start
```

To start the server in development mode using Nodemon, run:

```bash
npm run dev
```

Alternatively, you can run:

```bash
node server.js
```

The server will run at:

```text
http://localhost:5000
```

## 8. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update complete task |
| PATCH | `/api/tasks/:id` | Update selected fields |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/tasks/status/:status` | Filter tasks by status |
| GET | `/api/tasks/priority/:priority` | Filter tasks by priority |
| GET | `/api/tasks/summary` | Get task summary |
| GET | `/api/tasks/employee/:name` | Get employee tasks |
| GET | `/api/tasks/overdue` | Get overdue tasks |

## 9. Task Data Fields

Each task contains the following fields:

- **id:** Unique task ID (Number).
- **title:** Task title (String).
- **description:** Task details (String).
- **assignedTo:** Employee name (String).
- **priority:** Low, Medium, or High.
- **status:** Pending, In Progress, or Completed.
- **dueDate:** Deadline in YYYY-MM-DD format.

## 10. Validation and Error Handling

The API handles the following situations:

- Missing required fields.
- Empty task title.
- Invalid priority and status values.
- Invalid date format.
- Non-existing task IDs.
- Unknown API routes.
- Unexpected server errors.

The API returns appropriate HTTP status codes:

| Status Code | Description |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

## 11. API Testing

All required API endpoints have been tested using Postman.

The exported Postman collection is included in the `postMan` folder.

The collection contains requests for CRUD operations, filtering, additional challenges, and validation testing.

## 12. Data Storage

Task records are stored in JavaScript arrays. No external database is required for this project.

## 13. Author

**Project:** Employee Task Management REST API

**Technology:** Node.js and Express.js

Developed as part of a backend development assignment.
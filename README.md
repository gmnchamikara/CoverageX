# CoverageX | Technical Assessment for Full Stack Engineer Position
 
# 🐳 Next.js + Node.js + MySQL Dockerized Project

# email
## chamikaragmn@gmail.com

# Task App

## Overview
This is a **Dockerized full-stack application** using:
- **Frontend**: Next.js (React) Next.js (TypeScript) with Tailwind CSS
- **Backend**: Node.js (Express)
- **Database**: MySQL 8
- **Containerization**: Docker & Docker Compose

## 📂 Project Structure

This is a simple Task Management App built using the following tech stack:

### Features
- Mobile-responsive UI
- Add, edit, and mark tasks as done
- Only the most recent 5 to-do tasks are displayed in the UI
- Completed tasks are removed from the UI

## Architecture
The system consists of three main components:

1. **Database:** Stores to-do tasks in a table named `task`.
2. **Backend API:** REST API built using Node.js and Express.js to facilitate user operations.
3. **Frontend UI:** A simple SPA built using Next.js and TypeScript.

## Prerequisites
Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup & Installation

### 1. Clone the Repository
```sh
git clone https://github.com/gmnchamikara/CoverageX
cd task-app
```

### 2. Build and Run Containers
```sh
docker-compose up --build
```
This will:
- Start a MySQL container with the database.
- Start the backend API container.
- Start the frontend Next.js application.

### 3. Access the Application
- **Frontend UI:** http://localhost:3000
- **Backend API:** http://localhost:8181
- **MySQL Database:** Accessible on `localhost:3306`

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/tasks` | Fetch the latest 5 tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Edit a task |
| DELETE | `/tasks/:id` | Mark a task as done and remove it |

## Stopping the Containers
To stop the running containers:
```sh
docker-compose down
```

## License
This project is licensed under the MIT License.





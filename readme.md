# E-COMMERCE PERSONAL WEB APP

This document outlines the installation, running instructions, and folder structure for the E-COMMERCE PERSONAL WEB APP project. This project is divided into three main folders: `client` (frontend), `server` (backend), and `mysql` (Docker for MySQL).

## Folder Structure

The project has the following structure:

```bash
e-commerce-personal-web-app/
├── client/                     # Frontend Application (ONPROGRESS)
│   └── ...
├── server/                     # Backend Application
│   ├── src/                    # Backend source code
│   │   ├── controllers/        # Route handlers/controllers
│   │   ├── middleware/         # Middleware (authorization, logging)
│   │   ├── models/            # Data models and database interactions
│   │   ├── routes/            # API route definitions
│   │   ├── utils/             # Utility functions
│   │   ├── app.ts             # Application initialization
│   │   ├── config/            # Application configuration
│   │   └── index.ts           # Main entry point
│   ├── .env                   # Environment variables
│   ├── package.json           # Backend dependencies and scripts
│   └── tsconfig.json          # TypeScript configuration
├── mysql/                     # Docker configuration for MySQL
│   ├── Dockerfile             # MySQL image configuration
│   ├── docker-compose.yml     # Docker Compose configuration
│   └── init.sql              # Database initialization script
├── .gitignore                # Git ignored files
└── README.md                 # Project documentation
```

**Note:** The `.env` file contains sensitive information and should be added to `.gitignore`.

## Installation and Running Instructions

### Prerequisites

- Node.js and npm (or yarn) - [https://nodejs.org/](https://nodejs.org/)
- Docker - [https://www.docker.com/](https://www.docker.com/)

### 1. Backend Setup (`server`)

```bash
cd server
bun install

# Create and configure .env file
# Then start the server:
bun start
```

### 2. Frontend Setup (`client`)

[In Progress]

### 3. Database Setup (`mysql`)

```bash
cd mysql
docker-compose up -d
```

#### Database Initialization

The `init.sql` script will automatically execute on first container startup. For manual database operations:

```bash
# Connect to MySQL container
mysql -h localhost -P 3306 -u [username] -p

# Or use GUI tools like:
# - MySQL Workbench
# - DBeaver
```

Connection details are defined in `mysql/docker-compose.yml` or related `.env` file.

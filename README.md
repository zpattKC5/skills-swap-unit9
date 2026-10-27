# Skill Swap Frontend

This repository contains the frontend for the Skill Swap app, connected to the provided backend API repository.

## Backend repo

The backend used for this assignment is:

- https://github.com/RizeComputerScience/COMPSIX-skill-swap-backend

## Setup

1. Start the backend in a separate terminal:

```bash
git clone https://github.com/RizeComputerScience/COMPSIX-skill-swap-backend.git
cd COMPSIX-skill-swap-backend
npm install
cp .env.example .env
npm run setup
npm start
```

2. In this frontend repo, install dependencies:

```bash
npm install
```

3. Start the frontend server:

```bash
npm start
```

4. Open the app in a browser:

```text
http://localhost:3001
```

The frontend calls the backend at:

```text
http://localhost:3000/api/skills
```

## Features

- Loads skills from the API
- Creates skill entries in the database
- Filters skills by category
- Calculates total cost of all visible skills
- Matches skills to a user preference profile
- Includes unit tests for the core utility functions

## Tests

```bash
npm test
```

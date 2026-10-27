# Skill Swap Frontend

This repository contains the frontend for the Skill Swap app and connects to the provided backend API repository.

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

3. Start the frontend app:

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

- Loads skills from the API on page load
- Persists newly created skills to the database
- Filters skills by category
- Calculates the total cost of visible skills
- Matches available skills to a user's category and keyword preferences
- Displays loading and error states for a more polished user experience
- Includes unit tests for the required utility functions

## Tests

```bash
npm test
```

## Notes for grading

- No hardcoded skill arrays are used in the main app flow
- Data is retrieved from the backend database through the API
- New skills are saved and reloaded immediately for persistence
- Core utility functions are covered by automated tests

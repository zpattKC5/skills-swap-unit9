# Skill Swap - Unit 8

This project implements the Skill Swap filtering, cost calculation, and match logic using test-driven development.

## Features

- Filter skills by category
- Calculate total project cost based on hourly rate and hours
- Match skills to a user based on category and max price
- UI integration for all three functions

## Setup

```bash
npm install
npm test
```

## Run the app locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Files

- `skillswap-functions.js` - exported logic functions
- `__tests__/skillswap.test.js` - Jest tests
- `index.html` - UI for filters, cost calculator, and match results
- `style.css` - page styling
- `script.js` - DOM event handling and rendering

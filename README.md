# Best-study-method

A full-stack web app that allows users to take a 30-question multiple choice quiz to determine their most effective study method. Built with React (frontend) and Node.js/Express (backend). Ready for deployment on Render.

## Getting Started

### Local Development

1. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```
2. **Start the backend server:**
   ```bash
   npm start
   ```
3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```
4. **Start the frontend:**
   ```bash
   npm start
   ```

The React app will run on [http://localhost:3000](http://localhost:3000) and the API on [http://localhost:5000](http://localhost:5000).

### Deploying to Render

- Create two web services on Render:
  - One for the `server` folder (Node.js backend)
  - One for the `client` folder (React frontend, set build/start commands as in `package.json`)
- Set the API URL in the frontend to your Render backend URL (see `.env` file).

## Features
- 30-question quiz
- Returns a recommended study method (Visual, Auditory, Reading/Writing, Kinesthetic)
- Modern, responsive UI
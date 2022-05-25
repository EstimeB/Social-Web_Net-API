// Importing/require express, connection, routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Returns the current working directory
const cwd = process.cwd();

// Starts server (will respond to root URL(/)/route & return 404 for other path)
const app = express();
// & listens on port 3001 for connection
const PORT = 3001;

// * Not necessary for the Express server to function. 
// Helps indicate what server activity is running, in the terminal.
const activity = cwd.includes('01-Activities')
  ? cwd.split('/01-Activities/')[1]
  : cwd;

// Build in middleware function in express (parse incoming requests and add data in req)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Starts up the server on the specified port
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
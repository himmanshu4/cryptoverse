// sessionConfig.js
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const sessionConfig = {
  secret: process.env.SESSION_SECRET, // Replace with a random secret key
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({
    db: 'sessions.db', // Name of the SQLite database file to store sessions
    dir: './tmp', // Directory where the SQLite database file will be stored
    table: 'sessions', // Name of the sessions table in the database
    autoReconnect: true, // Enable auto-reconnect for SQLite
    ttl: 604800, // Session TTL (in seconds) - Set to 1 week (7 days) as an example
  }),
};

module.exports = sessionConfig;

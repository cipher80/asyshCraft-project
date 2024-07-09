const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../request_logs.txt');

const loggingMiddleware = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url} - ${JSON.stringify(req.body)}\n`;
  fs.appendFile(logFile, log, (err) => {
    if (err) {
      console.error('Failed to write to log file', err);
    }
  });
  console.log(log);
  next();
};

module.exports = loggingMiddleware;
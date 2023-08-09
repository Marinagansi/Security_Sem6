const fs = require('fs');
const moment = require('moment');

const auditLogStream = fs.createWriteStream('./logs/audit.log', { flags: 'a' });

function auditLogMiddleware(req, res, next) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  const logEntry = `[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}\n`;

  auditLogStream.write(logEntry);

  next();
}

module.exports = auditLogMiddleware;

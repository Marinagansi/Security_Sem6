const fs = require('fs');
const moment = require('moment');

const auditLogStream = fs.createWriteStream('./logs/audit.log', { flags: 'a' });

function auditLogMiddleware(req, res, next) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  const logEntry = `[${timestamp}] ${req.method} ${req.url}`;

  if (req.url === '/login' && !loginFailed) {
    const customLogEntry = `${logEntry}  login successful`;
    auditLogStream.write(customLogEntry + '\n');
  }  else if (req.url === 'users/register') {
    const customLogEntry = `${logEntry}  user registered`;
    auditLogStream.write(customLogEntry + '\n');
  } else if (req.url === '/product') {
    const customLogEntry = `${logEntry}  got product`;
    auditLogStream.write(customLogEntry + '\n');
  } else {
    const errorLogEntry = `[ERROR] ${logEntry} - Invalid request`;
    auditLogStream.write(errorLogEntry + '\n');
  }

  next();
}

module.exports = auditLogMiddleware;








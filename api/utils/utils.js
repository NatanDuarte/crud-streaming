const crypto = require('crypto');

function generateSecretKey(length) {
  return crypto.randomBytes(length).toString('hex');
}

module.exports = { generateSecretKey };

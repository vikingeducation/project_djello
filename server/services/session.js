const SECRET = process.env['secret'] || 'I like pickles';
const md5 = require('md5');

const createSignedSessionId = email => {
	return `${email}:${generateSignature(email)}`;
};

const generateSignature = email => md5(email + SECRET);

module.exports = createSignedSessionId;

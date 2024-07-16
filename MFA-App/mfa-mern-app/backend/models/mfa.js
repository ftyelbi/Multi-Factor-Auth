"""Generate QR code and secret key"""

const googleAuthenticator = require('google-authenticator');

const mfaSecret = googleAuthenticator.generateSecret();
const qrCodeUrl = googleAuthenticator.generateQRCode(
	  'MFA Example',
	  mfaSecret
);

module.exports = { mfaSecret, qrCodeUrl };

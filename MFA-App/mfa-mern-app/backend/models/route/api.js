"""Implement login and logout routes"""
"""Implement MFA verification"""

const express = require('express');
const router = express.Router();
const { mfaSecret } = require('../models/mfa');

router.post('/mfa/verify', async (req, res) => {
	  const { token } = req.body;
	  const user = await User.findById(req.user._id);
	  const verified = await googleAuthenticator.verifyToken(
		      user.mfaSecret,
		      token
		    );
	  if (verified) {
		      user.mfaEnabled = true;
		      await user.save();
		      res.json({ message: 'MFA enabled successfully' });
		    } else {
			        res.status(401).json({ message: 'Invalid MFA token' });
			      }
});

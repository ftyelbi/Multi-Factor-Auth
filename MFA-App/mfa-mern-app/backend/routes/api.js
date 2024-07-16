"""Implement login and logout routes"""
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local'), (req, res) => {
		  res.json(req.user);
});

router.get('/logout', (req, res) => {
		  req.logout();
		  res.json({ message: 'Logged out successfully' });
});

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

"""Update login route to inlude mfa verification"""
router.post('/login', passport.authenticate('local', {
		  successRedirect: '/mfa/verify',
		  failureRedirect: '/login-error'
}));

"""Create MFA verification route"""
router.get('/mfa/verify', async (req, res) => {
		  const user = await User.findById(req.user._id);
		  if (!user.mfaEnabled) {
			  		      return res.redirect('/login-error');
			  		    }
		  const qrCodeUrl = await googleAuthenticator.generateQRCode(
			  		      'MFA Example',
			  		      user.mfaSecret
			  		    );
		  res.json({ qrCodeUrl });
});

"""Update login route to store session"""
router.post('/login', passport.authenticate('local', {
	  successRedirect: '/mfa/verify',
	  failureRedirect: '/login-error'
}), (req, res) => {
	  const user = req.user;
	  req.session.user = user;
	  res.redirect('/mfa/verify');
});

"""Update MFA verification route to validate session"""
router.get('/mfa/verify', async (req, res) => {
	  const user = req.session.user;
	  if (!user) {
		      return res.redirect('/login-error');
		    }
	  const qrCodeUrl = await googleAuthenticator.generateQRCode(
		      'MFA Example',
		      user.mfaSecret
		    );
	  res.json({ qrCodeUrl });
});

"""Create logout route"""
router.get('/logout', (req, res) => {
	  req.session.destroy();
	  res.redirect('/login');
});

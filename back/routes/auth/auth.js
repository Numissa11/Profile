const express = require('express');
const router = express.Router();
const connection = require('../../sql/helpers/db');

// http://localhost:3000/auth/signup
router.post('/signup', function (req, res, next) {
      const formData = req.body;
    
      return connection.query(
        'INSERT INTO users SET ?',
        [formData],
        (err, results) => {
          if (err) res.status(500).json({ flash: err.message });
          else res.status(200).json({ flash: 'User has been signed up!' });
        },
      );
    });

module.exports = router;
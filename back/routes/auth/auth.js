const express = require('express');
const router = express.Router();
const connection = require('../../sql/helpers/db');

// http://localhost:5000/auth/signup
router.post('/signup', function(req, res, next) {
        const userData = req.body;
        connection.query('INSERT INTO users SET ?', userData, (err, results) => {
            if (err) {
                return res.status(500).json({
                  error: err.message,
                  sql: err.sql,
                });
              }
              return connection.query('SELECT * FROM users WHERE id = ?', results.insertId, (err2, records) => {
                if (err2) {
                  return res.status(500).json({
                    error: err2.message,
                    sql: err2.sql,
                  });
                }
                const insertedUser = records[0];
                return res
                  .status(201)
                  .json(insertedUser);
              });
            });
        });


module.exports = router;
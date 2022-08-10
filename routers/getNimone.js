const express = require('express');
const router = express.Router();
const connDB = require('../config/connDB')

// get nimone
router.get('/', (req,res) => {
   connDB.execute(
      `SELECT * FROM nimones INNER JOIN users on nimones.userID = users.userID ORDER BY users.first_name`,
      (err, result, feilds) => {
   // --- response --- //
         res.json(result)
      }
   )
});

router.get('/:id', (req,res) => {
   connDB.execute(
      `SELECT * FROM nimones INNER JOIN users ON nimones.nimoneID = users.userID WHERE nimones.nimoneID = ?`,
      [req.params.id],
      (err, result, fields) => {
         if (err) throw err
         res.json(result);
      }
   )
});

module.exports = router
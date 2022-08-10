const express = require('express');
const router = express.Router();
const connDB = require('../config/connDB')

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
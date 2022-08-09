const express = require('express');
const router = express();

// -->> DATABASE <<-- //
const conndb = require('../config/connDB');

// get nimone
router.get('/nimone', (req,res) => {
   conndb.execute(
      `SELECT * FROM nimones INNER JOIN users on nimones.nimoneID = users.userID ORDER BY users.first_name`,
      (err, result, feilds) => {
         res.json(result)
      }
   )
});

// create Nimone
router.post('/create/nimone', (req,res) => {
   const userInp = req.body;
   conndb.execute(
      `INSERT INTO users (first_name, last_name) VALUES (?, ?)`,
      [userInp.first_name, userInp.last_name],
      (err, result, feilds) => {
         if (err) throw err

         conndb.execute(
            `INSERT INTO nimones (type, monk, detail, location, address, district, ampor, city, userID)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
               userInp.type, userInp.monk, userInp.detail || null, userInp.location,
               userInp.address || null, userInp.district || null, userInp.ampor || null,
               userInp.city || null, result.insertId
            ],
            (err, result, feilds) => {
               if (err) throw err
               res.json(result)
            }
         )
      }
   )
});

// edit nimone 
router.put('/edit/:id', (req, res) => {
   const userInp = req.body;

   conndb.execute(
      `UPDATE users SET first_name = ?, last_name = ? WHERE users.userID = ?`,
      [userInp.first_name || null, userInp.last_name || null, req.params.id],
      (err, result, fields) => {
         if (err) throw err
      }
   )

   conndb.execute(
      `UPDATE nimones SET type = ?, monk = ?, detail = ?, location = ?, address = ?, district = ?, ampor = ?, city = ? WHERE userID = ?`,
      [
         userInp.type || undefined, userInp.monk || undefined, userInp.detail || undefined, userInp.location || undefined,
         userInp.address ||undefined, userInp.district ||undefined, userInp.ampor ||undefined,
         userInp.city ||undefined, req.params.id
      ],
      (err, result, fields) => {
         if (err) throw err
         res.json(result)
      }
   )

})


module.exports = router;
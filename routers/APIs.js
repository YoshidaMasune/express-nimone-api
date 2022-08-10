const express = require('express');
const router = express();

// -->> DATABASE <<-- //
const conndb = require('../config/connDB');

// get nimone
router.get('/nimone', (req,res) => {
   conndb.execute(
      `SELECT * FROM nimones INNER JOIN users on nimones.nimoneID = users.userID ORDER BY users.first_name`,
      (err, result, feilds) => {
   // --- response --- //
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

// -->> edit nimone <<-- //
const validateForm = require('../middleware/validateForm')

router.put('/edit', validateForm, (req, res) => {
   const userInp = req.body;

   conndb.execute(
      `UPDATE users SET first_name = ?, last_name = ? WHERE users.userID = ?`,
      [userInp.first_name, userInp.last_name, userInp.id],
      (err, result, fields) => {
         if (err) throw err
      }
   )

   conndb.execute(
      `UPDATE nimones SET type = ?, monk = ?, detail = ?, location = ?, address = ?, district = ?, ampor = ?, city = ? WHERE userID = ?`,
      [
         userInp.type , userInp.monk , userInp.detail , userInp.location ,
         userInp.address, userInp.district, userInp.ampor,
         userInp.city, userInp.id
      ],
      (err, result, fields) => {
         if (err) throw err
         // --- response --- //
         res.json(result)
      }
   )

});

// -->> DELETE <<-- //
router.delete('/delete/', (req,res) => {
   try{
      conndb.execute(
         `DELETE FROM nimones WHERE nimones.nimoneID = ?`,
         [req.body.id],
         (err, result, feilds) => {
            if (err) throw err
            if (result.affectedRows){
               res.send('delete 1 record')
            }else{
               res.send('no user')
            }
         }
      );

      // res.status(200).send('delete 1 record.!')
   }catch(err){
      console.log(err)
   }
  
})


module.exports = router;
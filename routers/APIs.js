const express = require('express');
const router = express();

// -->> DATABASE <<-- //
const conndb = require('../config/connDB');

// MiddleWare
const validateForm = require('../middleware/validateForm')
const createNimone_valid = require('../middleware/createNimone_valid')

// create Nimone
router.post('/create/nimone', createNimone_valid, (req,res) => {
   const userInp = req.body;

   conndb.execute(
      `INSERT INTO users (first_name, last_name, tel_number) VALUES (?, ?, ?)`,
      [userInp.first_name, userInp.last_name, userInp.tel_number],
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

router.put('/edit', validateForm, (req, res) => {
   const userInp = req.body;
   conndb.execute(
      `UPDATE users SET first_name = ?, last_name = ?, tel_number = ? WHERE userID =  ?`,
      [userInp.first_name, userInp.last_name, userInp.tel_number, userInp.userID],
      (err, result, fields) => {
         if (err) throw err
      }
   )

   conndb.execute(
      `
      UPDATE nimones 
      SET type = ?, monk = ?, 
      detail = ?, location = ?, 
      address = ?, district = ?, 
      ampor = ?, city = ?
      WHERE userID = ?`,
      [
         userInp.type, 
         userInp.monk, 
         userInp.detail, 
         userInp.location,
         userInp.address, 
         userInp.district, 
         userInp.ampor,
         userInp.city, 
         userInp.userID,
      ],
      (err, result, fields) => {
         if (err) throw err
         // --- response --- //
         res.status(200).send('one record is edited')
      }
   )

});

// -->> DELETE <<-- //
router.delete('/delete', (req,res) => {
   try{
      conndb.execute(
         `DELETE FROM nimones WHERE nimones.nimoneID = ?`,
         [req.body.id],
         (err, result, feilds) => {
            if (err) throw err
            if (result.affectedRows){
               res.status(200).send('delete 1 record.!')
            }else{
               res.send('no user')
            }
         }
      );
   }catch(err){
      console.log(err)
      res.status(500).send("get errer at server ..!")
   }
  
})

module.exports = router;
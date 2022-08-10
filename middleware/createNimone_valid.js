
const createNimone_valid = (req, res, next) => {
   const userInp = req.body;
   if (
      userInp.first_name &&
      userInp.last_name &&
      userInp.type &&
      userInp.monk &&
      userInp.location &&
      userInp.tel_number
      ){
         next();
      }else{
         res.status(400).send('bad request')
      }
}

module.exports = createNimone_valid;
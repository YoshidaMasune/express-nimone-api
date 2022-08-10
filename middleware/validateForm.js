// check from from API edit 

const validateForm = (req, res, next) => {
   const userInp = req.body;
   if (
      userInp.type &&
      userInp.monk &&
      userInp.detail &&
      userInp.location &&
      userInp.address &&
      userInp.district &&
      userInp.ampor &&
      userInp.city &&
      userInp.id
      ){
         next();
      }else{
         res.status(400).send('bad request')
      }
}

module.exports = validateForm;
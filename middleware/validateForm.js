// check from from API edit 

const validateForm = (req, res, next) => {
   const userInp = req.body;
   if (
      userInp.type  &&
      userInp.monk  &&
      userInp.location  &&
      userInp.tel_number  &&
      userInp.userID 
      ){
         next();
      }else{
         console.log(req.body);
         res.status(400).send('bad request')

         
      }
}

module.exports = validateForm;
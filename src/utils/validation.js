const validator = require("validator");
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId , password} = req.body;
    if(!firstName || !lastName){
        throw new Error("name is not valid");

    } else if(!validator.isEmail(emailId)){
        throw new Error("EMAIL is not valid");
    } else if (!validator.isStrongPassword(password)){
        throw new Error("please enter strong password");
    }
};
const validateEditProfileData = (req) => {
     const allowedEditFiels = ["firstName","lastName","photoUrl","age","about","gender","skills"];
     const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFiels.includes(field));
   return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
};
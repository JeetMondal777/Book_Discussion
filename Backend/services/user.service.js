const userModel = require("../models/user")

module.exports.createUser = async({firstname, lastname, email,password,coverImage})=>{
    if(!firstname || !email || !password ){
        throw new Error("All Fields Are Required")
    }else{
        const user = userModel.create({
            fullname:{
                firstname,
                lastname,
            },
            email,
            password,
            coverImage
            
        })
        return user
    }
}

// here we are creating the user if we achive our requirements whenever we call it
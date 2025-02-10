const express = require("express")
const router = express.Router()
const {body, validationResult} = require("express-validator")
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")

// router.post("/"), async(req,res)=>{
//     const errors = validationResult(req)
// }

router.post("/register", 
    [
        body("email").isEmail().isLength({min:11}).withMessage("Email must be atleast 11 characters long"),
        body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
        body("fullname.firstname").isLength({min:3}).withMessage("Firstname must be atleast 3 character long"),
    ],
    userController.registerUser
)

router.get("/",authMiddleware.findToken,
    userController.allUsers)

router.post("/login",
    [
        body("email").isEmail().isLength({min:11}).withMessage("Email must be atleast 11 characters long"),
        body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long"),

    ],
    userController.loginUser
)

router.get("/profile",authMiddleware.findToken,
    userController.getProfile
)

router.get("/logout",authMiddleware.findToken,
    userController.logoutUser
)




module.exports = router
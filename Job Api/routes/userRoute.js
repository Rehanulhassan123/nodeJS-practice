
const express = require("express")
const {registerUser,loginUser,updateUser,getAllUsers,deleteUser} = require("../controllers/userController.js")
const verfyJWT = require("../middlewares/verfyJWT.js")

const router = express.Router()

 router.route("/register").post(registerUser)
 router.route("/login").post(loginUser)
 router.route("/").get(getAllUsers)

 ///+++++++ secured Routes ++++++++++++++++++++++++

 router.route("/update").patch(verfyJWT,updateUser)
 router.route("/delete").delete(verfyJWT,deleteUser)
 


module.exports = router
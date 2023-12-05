const {Router} = require("express")
const { signUp , signIn , google} = require("../controllers/authControllers")

const router = Router()



router.post("/signup" , signUp)

router.post("/signin" , signIn) 

router.post("/google" , google)


module.exports = router
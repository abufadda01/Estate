const {Router} = require("express")
const { signUp } = require("../controllers/authControllers")

const router = Router()



router.post("/signup" , signUp) 



module.exports = router
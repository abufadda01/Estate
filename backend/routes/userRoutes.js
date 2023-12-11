const {Router} = require("express")
const {updateUserProfile} = require("../controllers/userControllers")

const verifyUser = require("../utils/verifyUser")

const router = Router()


router.post("/update/:userId" , verifyUser , updateUserProfile)


module.exports = router
const {Router} = require("express")
const {updateUserProfile , deleteUserProfile} = require("../controllers/userControllers")

const verifyUser = require("../utils/verifyUser")

const router = Router()


router.post("/update/:userId" , verifyUser , updateUserProfile)

router.delete("/delete/:userId" , verifyUser , deleteUserProfile)



module.exports = router
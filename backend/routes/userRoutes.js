const {Router} = require("express")
const {updateUserProfile , deleteUserProfile , getUserEstates , getUser} = require("../controllers/userControllers")

const verifyUser = require("../utils/verifyUser")

const router = Router()


router.post("/update/:userId" , verifyUser , updateUserProfile)

router.delete("/delete/:userId" , verifyUser , deleteUserProfile)

router.get("/getUserEstates/:userId" , verifyUser , getUserEstates)

router.get("/getUser/:userId" , verifyUser , getUser)



module.exports = router
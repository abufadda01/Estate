const {Router} = require("express")
const {createEstate} = require("../controllers/estateControllers")
const verifyUser = require("../utils/verifyUser")

const router = Router()



router.post("/createEstate" , verifyUser , createEstate)



module.exports = router
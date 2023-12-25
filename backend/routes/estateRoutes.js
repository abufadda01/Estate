const {Router} = require("express")
const {createEstate , deleteEstate} = require("../controllers/estateControllers")
const verifyUser = require("../utils/verifyUser")

const router = Router()



router.post("/createEstate" , verifyUser , createEstate)

router.delete("/deleteEstate/:estateId" , verifyUser , deleteEstate)


module.exports = router
const {Router} = require("express")
const {createEstate , deleteEstate , updateEstate} = require("../controllers/estateControllers")
const verifyUser = require("../utils/verifyUser")

const router = Router()



router.post("/createEstate" , verifyUser , createEstate)

router.delete("/deleteEstate/:estateId" , verifyUser , deleteEstate)

router.post("/updateEstate/:estateId" , verifyUser , updateEstate)


module.exports = router
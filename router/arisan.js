const { application } = require("express")
const Controller = require("../controller/arisan")

const router = require("express").Router()

router.get("/", Controller.fetchArisan)
router.post("/", Controller.addArisan)
router.get("/myarisan", Controller.fetchMyArisan)
router.post("myarisan/:id", Controller.addMyArisan)
router.post("/myarisan/:id", Controller.addTransaction)
router.get("/logTransaction", Controller.fetchLogTransaction)

module.exports = router
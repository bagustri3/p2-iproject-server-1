const Controller = require("../controller/arisan")
const router = require("express").Router()
router.get("/", Controller.fetchArisan)
router.get("/:id", Controller.fidOne)
router.post("/", Controller.addArisan)
module.exports = router
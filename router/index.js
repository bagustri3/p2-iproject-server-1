const authentication = require("../middlewares/authentication")
const router = require("express").Router()
const userRouter = require("../router/user")
const arisanRouter = require("../router/arisan")

router.use("/users", userRouter)
router.use(authentication)
router.use("/arisan", arisanRouter)
// router.use("/forum")

module.exports = router
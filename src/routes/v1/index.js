import express from "express"
const router = express.Router()
import user from './user.js'
import team from './team.js'

router.use("/user", user)
router.use("/team", team)

export default router
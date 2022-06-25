import express from "express"
const router = express.Router()
import { create, get, find, remove, patch, changePlan, login } from '../../controllers/v1/UserController.js'

router.post("/", create)

router.get("/", get)

router.get("/:id", find)

router.patch("/:id", patch)

router.patch("/change/:id", changePlan)//adicionar middleware

router.delete('/:id', remove)

router.post("/login", login)

export default router
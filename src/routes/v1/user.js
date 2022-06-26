//adicionar middleware de verificação se a pessoa faz parte da equipe

import express from "express"
const router = express.Router()
import { create, get, find, remove, patch, changePlan, login } from '../../controllers/v1/UserController.js'
import { authMiddleware } from "../../middlewares/v1/AuthMiddleware.js"

router.post("/", create)

router.get("/", authMiddleware, get)//adicionar middleware de moderação

router.get("/:id", authMiddleware, find)

router.patch("/:id", authMiddleware, patch)

router.patch("/change/:id", authMiddleware, changePlan)//adicionar middleware de equipe

router.delete('/:id', authMiddleware, remove)

router.post("/login", login)

export default router
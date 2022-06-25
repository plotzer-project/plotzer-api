import express from "express"
const router = express.Router()
import { create, get, find, remove, put, changePlan } from '../../controllers/v1/UserController.js'

router.post("/", create)

router.get("/", get)

router.get("/:id", find)

router.put("/:id", put)

router.put("/change/:id", changePlan)//adicionar middleware

router.delete('/:id', remove)

export default router
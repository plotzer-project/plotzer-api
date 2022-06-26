//adicionar middleware de verificação se a pessoa faz parte da equipe

import express from "express"
const router = express.Router()
import { authMiddleware } from "../../middlewares/v1/AuthMiddleware.js"
import { create, get, find, patch, remove, addMember, removeMember, joinTeam, leaveTeam } from '../../controllers/v1/TeamController.js'

router.post("/", authMiddleware, create)

router.get("/", authMiddleware, get)//adicionar middleware de moderação

router.get("/:id_team", authMiddleware, find)

router.patch("/:id_team", authMiddleware, patch) //adicionar middleware pra ser o dono ou gerente da equipe a mudar

router.delete("/:id_team", authMiddleware, remove)

router.patch("/:id_team/add/:id_member", authMiddleware, addMember)

router.patch("/:id_team/remove/:id_member", authMiddleware, removeMember)

router.patch("/join/:id_team", authMiddleware, joinTeam)

router.patch("/leave/:id_team", authMiddleware, leaveTeam)

export default router
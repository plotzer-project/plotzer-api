//add: check if the user checking this page is from your team

import * as jwt from "../../services/v1/jwt.js"
import UserModel from '../../model/v1/User.js'
import { errNeedsToken, errTokenInvalid } from "../../utils/v1/errors.js"

const authMiddleware = async (req, res, next) => {
    if (!req.headers['authorization']) return res.status(errNeedsToken.status).json(errNeedsToken)
    const [, token] = req.headers['authorization'].split(" ")

    try {

        const payload = jwt.decode(token)
        const user = await UserModel.findById(payload.id)

        if (!user) return res.status(errSignUp.status).send({ errors: [errSignUp] })
      
        let dataUser = {
            id: user._id,
            username: user.name,
            email: user.email,
            plan: user.plan,
            team: user.team,
            photo: user.photo
        }
        req.auth = dataUser
        req.token = {
            token,
            expiresIn: payload.exp
        }
        next()
    } catch (error) {
        return res.status(errTokenInvalid.status).json(errTokenInvalid)
    }
}

export { authMiddleware }
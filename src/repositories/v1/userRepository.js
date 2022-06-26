//fazer verificação dos campos + erros dps

import UserModel from '../../model/v1/User.js'
import { UserException } from '../../utils/v1/errors.js'

export const changePlan = async (id, plan) => {
    switch (plan) {
        case "Gratuito":
        case "Plano 1":
        case "Plano 2":
            const user = UserModel.findByIdAndUpdate(id, { plan })
            return user
        default:
            throw new UserException("invalid data")
    }
}

export const login = async (email) => {
    const user = await UserModel.findOne({ email })
    return user
}

export const create = async (name, email, password, team, plan, photo) => {
    switch (plan) {
        case "Plano 1":
        case "Plano 2":
            plan;
            break;
        default:
            plan = "Gratuito"
            break;
    }
    const User = new UserModel({ name, email, password, team, plan, photo })
    await User.save()
    return User
}

export const get = async () => {
    const users = await UserModel.find({})
    return users
}

export const find = async (id) => {
    const users = await UserModel.findById(id)
    return users
}

export const remove = async (id) => {
    const user = await UserModel.findByIdAndDelete(id)
    return user
}

export const patch = async (id, data) => {
    const user = await UserModel.findByIdAndUpdate(id, data)
    return user
}

export const leaveTeam = async (id_user) =>{
    const user = await UserModel.findByIdAndUpdate(id_user, {team: null})
    return user
}

export const addTeam = async (id_user, id_team) =>{
    const user = await UserModel.findByIdAndUpdate(id_user, {team: id_team})
    return user
}

const userRepository = {
    create,
    get,
    find,
    remove,
    patch,
    changePlan,
    login,
    leaveTeam,
    addTeam
}

export default userRepository
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

export const login = async (email, password)=>{ 
    return "Não feito ainda"
}

export const create = async (name, email, password) => {
    const User = new UserModel({ name, email, password })
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

const userRepository = {
    create,
    get,
    find,
    remove,
    patch,
    changePlan,
    login
}

export default userRepository
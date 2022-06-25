//fazer verificação dos campos + erros dps

import UserModel from '../../model/v1/User.js'

export const changePlan = async (id, plan) => {
    const user = UserModel.findByIdAndUpdate(id, {plan})
    return user
}

export const create = async (user, email, password) => {
    const User = new UserModel({ user, email, password })
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

export const put = async (id, data) => {
    const user = await UserModel.findByIdAndUpdate(id, data)
    return user
}

const userRepository = {
    create,
    get,
    find,
    remove,
    put,
    changePlan
}

export default userRepository
//fazer verificação dos campos + erros dps
//adicionar limite de retornos
import UserModel from '../../model/v1/User.js'
import { checkPlan } from '../../utils/v1/returns.js'

export const changePlan = async (id, plan) => {
    plan = checkPlan(plan)
    const user = UserModel.findByIdAndUpdate(id, { plan })
    return user
}

export const login = async (email) => {
    const user = await UserModel.findOne({ email })
    return user
}

export const create = async (name, email, password, team, plan, photo) => {
    plan = checkPlan(plan)
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
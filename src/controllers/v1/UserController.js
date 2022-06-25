//fazer verificação dos campos + erros dps
//alterar texto do remove
//botar o put para retornar os valores alterados

import { errGetValues, errPutValidData, errRemoveUser, errSignUp, errUpdateUser, errUserValueNotFound } from '../../utils/v1/errors.js'
import userRepository from '../../repositories/v1/userRepository.js'
import { userSuccessReturn } from '../../utils/v1/returns.js';

export const changePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const { plan } = req.body;
        const user = await userRepository.changePlan(id, plan)
        return res.status(200).send("Plano alterado para " + plan + "!")
    } catch (error) {
        if (error.message == "invalid data") {
            return res.status(errPutValidData.status).send(errPutValidData)
        }
        return res.status(500).send({ errors: [errUpdateUser] })
    }
}

export const login = async (req, res)=>{
    res.send("A fazer")
}

export const create = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const User = await userRepository.create(name, email, password)
        return res.status(200).send(userSuccessReturn(User))
    } catch (e) {
        return res.status(errSignUp.status).send({ errors: [errSignUp]})
    }
}

export const get = async (req, res) => {
    try {
        const users = await userRepository.get()
        if (users == null) {
            return res.status(404).send(errUserValueNotFound)
        }
        return res.send({ data: users.map(userSuccessReturn) })
    } catch (e) {
        return res.status(errGetValues.status).send({ errors: [errGetValues]})
    }
}

export const find = async (req, res) => {
    try {
        const { id } = req.params
        const users = await userRepository.find(id)
        if (users == null) {
            return res.status(404).send(errUserValueNotFound)
        }
        return res.send({ data: userSuccessReturn(users) })
    } catch (e) {
        return res.status(errGetValues.status).send({ errors: [errGetValues]})
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userRepository.remove(id)
        if (user == null) {
            return res.status(404).send(errUserValueNotFound)
        }
        return res.status(200).send({ data: "Deletado com sucesso!" }) //alterar dps
    } catch (error) {
        return res.status(errRemoveUser.status).send({ errors: [errRemoveUser]})
    }
}

export const patch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, team } = req.body;
        const userData = { name, email, password, team }
        const user = await userRepository.patch(id, userData)
        return res.status(200).send(userSuccessReturn(user))
    } catch (error) {
        return res.status(errUpdateUser.status).send({ errors: [errUpdateUser]})
    }
}


const UserController = {
    create,
    get,
    find,
    remove,
    patch,
    changePlan,
    login
}
export default UserController
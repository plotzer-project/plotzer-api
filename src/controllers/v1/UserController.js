//fazer verificação dos campos + erros dps
//alterar texto do remove
//botar o put para retornar os valores alterados
import { errGetValues, errLogIn, errPutValidData, errRemoveUser, errSignUp, errUpdateUser, errUserIncorrect, errUserNotFound } from '../../utils/v1/errors.js'
import userRepository from '../../repositories/v1/userRepository.js'
import { userSuccessReturn, userSuccessReturnJoin } from '../../utils/v1/returns.js';

import { GenerateAuthToken } from './generateAuthToken.js'

import bcrypt from 'bcrypt';
const saltRounds = 15; //bcrypt



export const changePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const { plan } = req.body;
        const user = await userRepository.changePlan(id, plan)
        if(user == null ) return res.status(errUserIncorrect.status).send(errUserIncorrect)
        return res.status(200).send("Plano alterado para " + plan + "!")
    } catch (error) {
        if (error.message == "invalid data") {
            return res.status(errPutValidData.status).send(errPutValidData)
        }
        return res.status(500).send({ errors: [errUpdateUser] })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userRepository.login(email)
        if(user == null ) return res.status(errUserIncorrect.status).send(errUserIncorrect)

        const checkPassword = bcrypt.compare(password, user.password);
        if (!checkPassword) return res.status(errUserIncorrect.status).send(errUserIncorrect)

        const generateToken = new GenerateAuthToken()
        const token = await generateToken.generate(user._id)

        return res.status(200).send(userSuccessReturnJoin(user, token))

    } catch (error) {
        console.log(error)
        return res.status(errLogIn.status).send({ errors: [errLogIn] })
    }
}

export const create = async (req, res) => {
    let { name, email, password, team, plan, photo } = req.body;

    try {

        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)

        password = hash

        const User = await userRepository.create(name, email, password, team, plan, photo)

        const generateToken = new GenerateAuthToken()
        const token = await generateToken.generate(User._id)

        return res.status(200).send(userSuccessReturnJoin(User, token))
    } catch (e) {
        console.log(e)
        return res.status(errSignUp.status).send({ errors: [errSignUp] })
    }
}

export const get = async (req, res) => {
    try {
        const users = await userRepository.get()
        if (users == null) {
            return res.status(errUserNotFound.status).send(errUserNotFound)
        }
        return res.send({ data: users.map(userSuccessReturn) })
    } catch (e) {
        return res.status(errGetValues.status).send({ errors: [errGetValues] })
    }
}

export const find = async (req, res) => {
    try {
        const { id } = req.params
        const users = await userRepository.find(id)
        if (users == null) {
            return res.status(errUserNotFound.status).send(errUserNotFound)
        }
        return res.send({ data: userSuccessReturn(users) })
    } catch (e) {
        return res.status(errGetValues.status).send({ errors: [errGetValues] })
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userRepository.remove(id)
        if (user == null) {
            return res.status(errUserNotFound.status).send(errUserNotFound)
        }
        return res.status(200).send({ data: "Deletado com sucesso!" }) //alterar dps
    } catch (error) {
        return res.status(errRemoveUser.status).send({ errors: [errRemoveUser] })
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
        return res.status(errUpdateUser.status).send({ errors: [errUpdateUser] })
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
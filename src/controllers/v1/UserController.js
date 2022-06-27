//fazer verificação dos campos + erros dps
//alterar texto do remove
//botar o put para retornar os valores alterados
//limite de caractere
//verificar texto de erro 
//definir se o change plan vai ser no time ou na equipe
//fazer moderação
import { errGetValues, errLogIn, errPutValidData, errRemoveUser, errSignUp, errUpdateUser, errUserIncorrect, errUserNotFound, errUsersNotFound } from '../../utils/v1/errors.js'
import userRepository from '../../repositories/v1/userRepository.js'
import { successfullyDeleted, userSuccessReturn, userSuccessReturnJoin } from '../../utils/v1/returns.js';

import { GenerateAuthToken } from './generateAuthToken.js'

import bcrypt from 'bcrypt';
const saltRounds = 15; //bcrypt

export const changePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const { plan } = req.body;
        const user = await userRepository.changePlan(id, plan)
        if (user == null) return res.status(errUserIncorrect.status).json(errUserIncorrect)
        return res.status(200).json("Plano alterado para " + plan + "!")
    } catch (error) {
        if (error.message == "invalid data") {
            return res.status(errPutValidData.status).json(errPutValidData)
        }
        return res.status(500).json({ errors: [errUpdateUser] })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        //usa o FindOne para buscar o email, caso não exista ja corta a aplicação e fala que o email ou senha ta incorreto
        const user = await userRepository.login(email)
        if (user == null) return res.status(errUserIncorrect.status).json(errUserIncorrect)

        //usa a lib bcrypt e verifica se a senha da requisição ao ser criptografada bate com a senha salva no mongo, caso contrario retorna que o email/senha ta incorreto
        const checkPassword = bcrypt.compare(password, user.password);
        if (!checkPassword) return res.status(errUserIncorrect.status).json(errUserIncorrect)

        //passa o id do usuario para esta classe que retorna um token JWT criptografado
        const generateToken = new GenerateAuthToken()
        const token = await generateToken.generate(user._id)

        //caso de tudo certo, retorna status 200(ok) e o token para uso
        return res.status(200).json(userSuccessReturnJoin(user, token))

    } catch (error) {
        //caso aconteça algum erro no login, ele manda uma mensagem de erro padronizada (preciso fazer mais verificações dps)
        return res.status(errLogIn.status).json({ errors: [errLogIn] })
    }
}

export const create = async (req, res) => {
    let { name, email, password, team, plan, photo } = req.body;

    try {
        //saltRounds = total de sequencias aleatorias da criptografia, neste caso, 10 (default)
        //aqui a gente gera as sequencias e cria a combinação da password do body em conjunto do salt
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)
        password = hash

        //criamos o usuario
        const user = await userRepository.create(name, email, password, team, plan, photo)

        //gero o token
        const generateToken = new GenerateAuthToken()
        const token = await generateToken.generate(user._id)

        //caso não tenha erros, retorna o usuario + token para uso
        return res.status(200).json(userSuccessReturnJoin(user, token))
    } catch (e) {
        //caso aconteça algum erro no cadastro, ele manda uma mensagem de erro padronizada (preciso fazer mais verificações dps)
        return res.status(errSignUp.status).json({ errors: [errSignUp] })
    }
}

export const get = async (req, res) => {
    //preciso botar limite de retornos + verificação de permissão
    try {
        //recebo os dados
        const users = await userRepository.get()

        //verifica se existe algum usuário
        if (users == null) return res.status(errUsersNotFound.status).json(errUsersNotFound)

        //caso tenha algum usuário ele mapeia os usuarios e retorna uma mensagem padronizada para cada um
        return res.status(200).json({ data: users.map(userSuccessReturn) })
    } catch (e) {
        //caso aconteça algum erro ao receber os dados, ele cai aqui (mais verificações dps)
        return res.status(errGetValues.status).json({ errors: [errGetValues] })
    }
}

export const find = async (req, res) => {
    //recebo o id do usuario que quero buscar atraves dos parametros, por ex: "/api/v1/user/1234567" sendo 1234567 o id do usuario
    const { id } = req.params

    try {
        //procuro o usuario com base no id
        const users = await userRepository.find(id)

        if (users == null) return res.status(errUserNotFound.status).json(errUserNotFound)
        return res.status(200).json({ data: userSuccessReturn(users) })
    } catch (e) {
        return res.status(errGetValues.status).json({ errors: [errGetValues] })
    }
}

export const remove = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userRepository.remove(id)

        if (user == null) return res.status(errUserNotFound.status).json(errUserNotFound)
        return res.status(200).json({ data: successfullyDeleted }) //alterar dps
    } catch (error) {
        return res.status(errRemoveUser.status).json({ errors: [errRemoveUser] })
    }
}

export const patch = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, team } = req.body;
    const userData = { name, email, password, team }

    try {
        const user = await userRepository.patch(id, userData)

        return res.status(200).json(userSuccessReturn(user))
    } catch (error) {
        return res.status(errUpdateUser.status).json({ errors: [errUpdateUser] })
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
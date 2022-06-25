//fazer verificação dos campos + erros dps
//alterar texto do remove
//botar o put para retornar os valores alterados

import { errGetValues, errRemoveUser, errSignUp, errUpdateUser, errUserValueNotFound } from '../../utils/v1/errors.js'
import userRepository from '../../repositories/v1/userRepository.js'
import { userSuccessReturn } from '../../utils/v1/returns.js';

export const changePlan = async (req, res)=>{
    try {
        const {id}=req.params;
        const {plan} = req.body;
        const user = await userRepository.changePlan(id, plan)
        return res.status(200).send("Plano alterado para "+plan+"!")
    } catch (error) {
        console.log(error)
        return res.status(500).send(errUpdateUser)
    }
}

export const create = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const User = await userRepository.create(name, email, password)
        return res.status(200).send(userSuccessReturn(User))
    } catch (e) {
        console.log(e)
        return res.status(500).send(errSignUp)
    }   
}

export const get = async (req, res) => {
    try {
        const users = await userRepository.get()
        if(users == null ) {
            return res.status(404).send(errUserValueNotFound)
        }
        return res.send({ data: users.map(userSuccessReturn) })
    } catch (e) {
        return res.status(500).send(errGetValues)
    }
}

export const find = async (req, res) => {
    try {
        const { id } = req.params
        const users = await userRepository.find(id)
        if(users == null ) {
            return res.status(404).send(errUserValueNotFound)
        }
        return res.send({ data: userSuccessReturn(users) })
    } catch (e) {
        return res.status(500).send(errGetValues)
    }
}

export const remove = async (req, res)=>{
    try {
        const {id} = req.params
        const user = await userRepository.remove(id)
        if(user == null ) {
            return res.status(404).send(errUserValueNotFound)
        }
        return res.status(200).send({data: "Deletado com sucesso!"}) //alterar dps
    } catch (error) {
        return res.status(500).send(errRemoveUser)
    }
}

export const put = async (req, res)=>{ 
    try {
        const {id}=req.params;
        const {name, email, password, team} = req.body;
        const userData = {name, email, password, team}
        const user = await userRepository.put(id, userData)
        return res.status(200).send(userSuccessReturn(user))
    } catch (error) {
        return res.status(500).send(errUpdateUser)
    }
}


const UserController = {
    create,
    get,
    find,
    remove,
    put,
    changePlan
}
export default UserController
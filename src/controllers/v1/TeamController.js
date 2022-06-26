//arrumar o filtro do addMember

//fazer verificação dos campos + erros dps

import { errAddMemberTeam, errCreateTeam, errGetValues, errRemoveTeam, errTeamsNotFound, errUpdateTeam, errUserIsAlreadyInTheTeam, errUserIsntOnTheTeam } from '../../utils/v1/errors.js'
import { teamSuccessReturn } from '../../utils/v1/returns.js'
import TeamRepository from '../../repositories/v1/teamRepository.js'
import userRepository from '../../repositories/v1/userRepository.js'

export const create = async (req, res) => {
    let { cnpj, team_name, plan } = req.body
    const {id, username, email, photo, reputation} = req.auth

    if(!team_name) {
        team_name = username + "'s Team"
    }
    
    try {

        const memberData = {
            id,
            name: username,
            email: email,
            photo: photo,
            position: "Owner",
            reputation
        }

        const team = await TeamRepository.create(cnpj, team_name, plan, id, memberData)
        const user = await userRepository.addTeam(id, team._id)

        console.log(team, user)

        return res.status(200).send(teamSuccessReturn(team))
    } catch (e) {
        console.log(e)
        return res.status(errCreateTeam.status).send({ errors: [errCreateTeam] })
    }

}
export const get = async(req, res)=>{
    try {
        const teams = await TeamRepository.get()
        if (teams == null) {
            return res.status(errTeamsNotFound.status).send(errTeamsNotFound)
        }
        return res.send({ data: teams.map(teamSuccessReturn) })
    } catch (e) {
        return res.status(errGetValues.status).send({ errors: [errGetValues] })
    }
}
export const find = async(req, res)=>{
    try {
        const { id_team } = req.params
        const team = await TeamRepository.find(id_team)

        if (team == null) {
            return res.status(errTeamsNotFound.status).send(errTeamsNotFound)
        }

        return res.send({ data: teamSuccessReturn(team) })
    } catch (e) {
        return res.status(errGetValues.status).send({ errors: [errGetValues] })
    }
}
export const patch = async(req, res)=>{
    try {
        const { id_team } = req.params;
        const { cnpj, team_name} = req.body;
        const teamData = { cnpj, team_name }
        const team = await TeamRepository.patch(id_team, teamData)
        return res.status(200).send(teamSuccessReturn(team))
    } catch (error) {
        console.log(error)
        return res.status(errUpdateTeam.status).send({ errors: [errUpdateTeam] })
    }
}
export const remove = async(req, res)=>{
    const {id} = req.auth
    try {
        const { id_team } = req.params
        const team = await TeamRepository.remove(id_team)
        if (team == null) {
            return res.status(errTeamsNotFound.status).send(errTeamsNotFound)
        }
        const user = await userRepository.leaveTeam(id)
        console.log(user)
        return res.status(200).send({ data: "Deletado com sucesso!" }) //alterar dps
    } catch (error) {
        console.log(error)
        return res.status(errRemoveTeam.status).send({ errors: [errRemoveTeam] })
    }
}
export const addMember = async(req, res)=>{
    const {id_team, id_member} = req.params;

    const {position, reputation} = req.body

    try {
        const member = await userRepository.find(id_member)
        const memberData = {
            id: member._id,
            name: member.name,
            email: member.email,
            photo: member.photo,
            position,
            reputation
        }

        const team = await TeamRepository.addMember(id_team, memberData)
        if(!team) return res.status(errUserIsAlreadyInTheTeam.status).send(errUserIsAlreadyInTheTeam)
        return res.status(200).send(teamSuccessReturn(team))
    } catch (error) {
        return res.status(errAddMemberTeam.status).send(errAddMemberTeam)        
    }
}

export const removeMember = async(req, res)=>{
    const {id_team, id_member} = req.params;

    try {
        const team = await TeamRepository.removeMember(id_team, id_member)
        if(!team) return res.status(errUserIsntOnTheTeam.status).send(errUserIsntOnTheTeam)
        return res.status(200).send(teamSuccessReturn(team))
    } catch (error) {
        console.log(error)
        return res.status(errRemoveMemberTeam.status).send(errRemoveMemberTeam)        
    }
}
export const joinTeam = async(req, res)=>{}
export const leaveTeam = async(req, res)=>{}
export const changePlan = async (req, res)=>{}

const TeamController = {
    create,
    get,
    find,
    patch,
    remove,
    addMember,
    removeMember,
    joinTeam,
    leaveTeam
}

export default TeamController
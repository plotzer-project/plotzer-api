//arrumar o filtro do addMember

//fazer verificação dos campos + erros dps

import { errAddMemberTeam, errCreateTeam, errGetValues, errRemoveMemberTeam, errRemoveTeam, errTeamsNotFound, errUpdateTeam, errUserIsAlreadyInTheTeam, errUserIsntOnTheTeam } from '../../utils/v1/errors.js'
import { successfullyDeleted, teamSuccessReturn } from '../../utils/v1/returns.js'
import TeamRepository from '../../repositories/v1/teamRepository.js'
import userRepository from '../../repositories/v1/userRepository.js'

export const create = async (req, res) => {
    let { cnpj, team_name, plan } = req.body
    const { id, username, email, photo } = req.auth

    if (!team_name) {
        team_name = username + "'s Team"
    }

    const memberData = {
        id,
        name: username,
        email: email,
        photo: photo,
        position: "Owner",
        reputation: 100
    }

    try {

        const team = await TeamRepository.create(cnpj, team_name, plan, memberData)

        return res.status(200).json(teamSuccessReturn(team))
    } catch (e) {
        return res.status(errCreateTeam.status).json({ errors: [errCreateTeam] })
    }

}
export const get = async (req, res) => {
    try {
        const teams = await TeamRepository.get()

        if (teams == null) return res.status(errTeamsNotFound.status).json(errTeamsNotFound)

        return res.json({ data: teams.map(teamSuccessReturn) })
    } catch (e) {
        return res.status(errGetValues.status).json({ errors: [errGetValues] })
    }
}

export const find = async (req, res) => {
    const { id_team } = req.params

    try {
        const team = await TeamRepository.find(id_team)

        if (team == null) return res.status(errTeamsNotFound.status).json(errTeamsNotFound)

        return res.json({ data: teamSuccessReturn(team) })
    } catch (e) {
        return res.status(errGetValues.status).json({ errors: [errGetValues] })
    }
}

export const patch = async (req, res) => {
    const { id_team } = req.params;
    const { id } = req.auth
    const { cnpj, team_name } = req.body;
    const teamData = { cnpj, team_name }

    try {
        const team = await TeamRepository.patch(id_team, teamData, id)

        return res.status(200).json(teamSuccessReturn(team))
    } catch (error) {
        console.log(error)
        return res.status(errUpdateTeam.status).json({ errors: [errUpdateTeam] })
    }
}
export const remove = async (req, res) => {
    //fazer pra rremover ser membro de todos os usuarios
    const { id_team } = req.params
    const { id } = req.auth
    try {
        const team = await TeamRepository.remove(id_team, id)
        if (team == null) return res.status(errTeamsNotFound.status).json(errTeamsNotFound)

        return res.status(200).json({ data: successfullyDeleted })
    } catch (error) {
        return res.status(errRemoveTeam.status).json({ errors: [errRemoveTeam] })
    }
}

export const addMember = async (req, res) => {
    const { id } = req.auth
    const { id_team, id_member } = req.params;
    const { position, reputation } = req.body

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

        const team = await TeamRepository.addMember(id_team, memberData, id)
        if (!team) return res.status(errUserIsAlreadyInTheTeam.status).json(errUserIsAlreadyInTheTeam)

        return res.status(200).json(teamSuccessReturn(team))
    } catch (error) {
        return res.status(errAddMemberTeam.status).json(errAddMemberTeam)
    }
}

export const removeMember = async (req, res) => {
    const { id } = req.auth
    const { id_team, id_member } = req.params;

    try {
        const team = await TeamRepository.removeMember(id_team, id_member, id)
        if (!team) return res.status(errUserIsntOnTheTeam.status).json(errUserIsntOnTheTeam)

        return res.status(200).json(teamSuccessReturn(team))
    } catch (error) {
        console.log(error)
        return res.status(errRemoveMemberTeam.status).json(errRemoveMemberTeam)
    }
}
export const joinTeam = async (req, res) => {
    const { id } = req.auth
    const { id_team } = req.params;
    const { position, reputation } = req.body

    try {
        const member = await userRepository.find(id)
        const memberData = {
            id: member._id,
            name: member.name,
            email: member.email,
            photo: member.photo,
            position,
            reputation
        }

        const team = await TeamRepository.joinTeam(id_team, memberData)
        if (!team) return res.status(errUserIsAlreadyInTheTeam.status).json(errUserIsAlreadyInTheTeam)

        return res.status(200).json(teamSuccessReturn(team))
    } catch (error) {
        return res.status(errAddMemberTeam.status).json(errAddMemberTeam)
    }
}

export const leaveTeam = async (req, res) => {
    const { id } = req.auth
    const { id_team } = req.params;

    try {
        const team = await TeamRepository.leaveTeam(id_team, id)
        if (!team) return res.status(errUserIsntOnTheTeam.status).json(errUserIsntOnTheTeam)

        return res.status(200).json(teamSuccessReturn(team))
    } catch (error) {
        console.log(error)
        return res.status(errRemoveMemberTeam.status).json(errRemoveMemberTeam)
    }
}

export const changePlan = async (req, res) => {
    
 }

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
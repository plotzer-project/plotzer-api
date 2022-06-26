//arrumar o filtro do addMember
//fazer verificação dos campos + erros dps

import TeamModel from '../../model/v1/Team.js'

export const create = async (cnpj, team_name, plan, ownerId, memberData) => {
    switch (plan) {
        case "Plano 1":
        case "Plano 2":
            plan = plan;
            break;
        default:
            plan = "Gratuito"
            break;
    }
    const Team = new TeamModel({ cnpj, team_name, plan, ownerId })
    Team.members.push(memberData)
    await Team.save()
    return Team
}

export const get = async () => {
    const teams = await TeamModel.find({})
    return teams
}

export const find = async (id_team) => {
    const team = await TeamModel.findById(id_team)
    return team
}

export const patch = async (id_team, data) => {
    const team = await TeamModel.findByIdAndUpdate(id_team, data)
    return team
}

export const remove = async (id_team) => {
    const team = await TeamModel.findByIdAndDelete(id_team)
    return team;
}

export const addMember = async (id_team, member_data) => {
    const team = await TeamModel.findById(id_team)
    if (team.members.length != 0) {
        let exists = team.members.filter((member) => {
            return member.id.toString() === member_data.id.toString()
        })
        if (exists.length != 0) { return false }
    }
    team.members.push(member_data)
    team.save()
    return team
}

export const removeMember = async (id_team, id_member) => {
    const team = await TeamModel.findById(id_team)
    let change = false
    for (let i = 0; i < team.members.length; i++) {
        if (team.members[i].id.toString() === id_member.toString()) {
            change = true
            team.members.splice(i, 1)
            i = team.members.length;
        }
    }
    team.save()
    if (!change) return false
    return team
}

export const joinTeam = async () => { }

export const leaveTeam = async () => { }

const TeamRepository = {
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

export default TeamRepository
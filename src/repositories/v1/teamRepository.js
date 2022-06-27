//arrumar o filtro do addMember
//fazer verificação dos campos + erros dps

import TeamModel from '../../model/v1/Team.js'
import { createLog } from './LogRepository.js';
import { checkPlan } from '../../utils/v1/returns.js'
import userRepository from './userRepository.js';

export const create = async (cnpj, team_name, plan, memberData) => {
    //verifica se o plano foi digitado certo
    plan = checkPlan(plan)

    const team = new TeamModel({ cnpj, team_name, plan, id: memberData.id })
    team.members.push(memberData)
    await team.save()
    const user = await userRepository.addTeam(ownerId, team._id)
    return team
}

export const get = async () => {
    const teams = await TeamModel.find({})
    return teams
}

export const find = async (id_team) => {
    const team = await TeamModel.findById(id_team)
    return team
}

export const patch = async (id_team, data, id_request) => {
    const team = await TeamModel.findByIdAndUpdate(id_team, data)
    const log = await createLog("Update", `The "${team.team_name}" team has changed its information`, "team", id_request, id_team)
    return team
}

export const remove = async (id_team, id_request) => {
    //fazer pra rremover ser membro de todos os usuarios
    const team = await TeamModel.findByIdAndDelete(id_team)
    const user = await userRepository.leaveTeam(id_request)
    const log = await createLog("Delete", `The team "${team.team_name}" has been deleted`, "team", id_request, id_team)
    return team;
}

export const addMember = async (id_team, member_data, id_request) => {
    const team = await TeamModel.findById(id_team)
    if (team.members.length != 0) {
        let exists = team.members.filter((member) => {
            return member.id.toString() === member_data.id.toString()
        })
        if (exists.length != 0) { return false }
    }
    team.members.push(member_data)
    team.save()
    const log = await createLog("Add member", `The member "${member_data.name}" has been added to the "${team.team_name}" team`, "team", id_request, id_team)
    return team
}

export const removeMember = async (id_team, id_member, id_request) => {
    const team = await TeamModel.findById(id_team)
    let change = false
    for (let i = 0; i < team.members.length; i++) {
        if (team.members[i].id.toString() === id_member.toString()) {
            change = true
            team.members.splice(i, 1)
            i = team.members.length;
        }
    }
    if (!change) return false
    team.save()
    const log = await createLog("Remove member", `The member "${id_member}" has been removed from the "${team.team_name}" team`, "team", id_request, id_team)
    return team
}

export const joinTeam = async (id_team, member_data) => {
    const team = await TeamModel.findById(id_team)
    if (team.members.length != 0) {
        let exists = team.members.filter((member) => {
            return member.id.toString() === member_data.id.toString()
        })
        if (exists.length != 0) { return false }
    }
    team.members.push(member_data)
    team.save()
    const log = await createLog("Join Team", `The member "${member_data.name}" has joined at "${team.team_name}" team`, "team", member_data.id, id_team)
    console.log(log)
    return team
}

export const leaveTeam = async (id_team, id_member) => {
    const team = await TeamModel.findById(id_team)
    let change = false
    for (let i = 0; i < team.members.length; i++) {
        if (team.members[i].id.toString() === id_member.toString()) {
            change = true
            team.members.splice(i, 1)
            i = team.members.length;
        }
    }
    if (!change) return false
    team.save()
    const log = await createLog("Leave Team", `The member "${id_member}" has left the "${team.team_name}" team`, "team", id_member, id_team)
    console.log(log)
    return team
}

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
import LogModel from '../../model/v1/Log.js'

export const createLog = async (name, description, category, id_user, id_team) =>{
    const log = new LogModel({name, description, category, id_user, id_team})
    await log.save()
    return log
}

export const getTeamLogs = async (id)=>{
    
}
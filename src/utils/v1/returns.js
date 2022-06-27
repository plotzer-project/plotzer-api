export const userSuccessReturn = (user) => {
    const data = {
        type: "user",
        id: user._id,
        attributes: {
            "name": user.name,
            "email": user.email,
            "plan": user.plan,
            "team": user.team,
            "photo": user.photo
        },
        links: {
            self: "/api/v1/users/" + user._id
        }
    }
    return data
}

export const userSuccessReturnJoin = (user, token) => {
    const data = {
        type: "user",
        id: user._id,
        attributes: {
            "name": user.name,
            "email": user.email,
            "plan": user.plan,
            "team": user.team,
            "photo": user.photo
        },
        links: {
            self: "/api/v1/users/" + user._id
        },
        "token": {
            token
        }
    }
    return data
}

export const teamSuccessReturn = (team) => {
    const data = {
        type: "team",
        id: team._id,
        attributes: {
            "cnpj": team.cnpj,
            "name": team.team_name,
            "plan": team.plan,
            "owner_id": team.ownerId,
            "members": team.members.map((el, i) => {
                return {
                    id: el.id,
                    name: el.name,
                    email: el.email,
                    position: el.position,
                    reputation: el.reputation + "%",
                    member_accepted: el.member_accepted, //if the team invite
                    team_accepted: el.team_accepted //if he tried to join 
                }
            })
        },
        links: {
            self: "/api/v1/team/" + team._id
        }
    }
    return data
}

export const successfullyDeleted = (language) => {
    return "Deletado com sucesso!"
}

export const checkPlan = (plan) => {
    switch (plan) {
        case "Plano 1":
        case "Plano 2":
            plan = plan;
            break;
        default:
            plan = "Gratuito"
            break;
    }
    return plan
}
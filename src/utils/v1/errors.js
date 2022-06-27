//https://jsonapi.org/format/#errors-processing ver dps e atualizar

export class UserException {
    constructor(message) {
        this.message = message;
        this.name = "UserException";
    }
}

class Errors {
    static lastId = 0;
    id;    

    constructor(){
        this.id = ++Errors.lastId
    }

    createError(_title, _detail, _status){
        return {
            id: this.id,
            title: _title,
            detail: _detail,
            status: _status,
        }
    }
}

export const errSignUp = new Errors().createError("Falha no cadastro", "Um erro ocorreu ao realizar um cadastro", 500)

export const errGetValues = new Errors().createError("Falha no cadastro", "Um erro ocorreu ao receber os dados", 500)

export const errUserNotFound = new Errors().createError("Falha na requisição", "Usuário não encontrado", 404)

export const errUsersNotFound = new Errors().createError("Falha na requisição", "Nenhum usuário foi encontrado", 404)

export const errRemoveUser = new Errors().createError("Falha na requisição", "Ocorreu um erro ao deletar o usuário", 500)

export const errUpdateUser = new Errors().createError("Falha na requisição", "Ocorreu um erro ao atualizar o usuário", 500)

export const errPutValidData = new Errors().createError("Valores Inválidos", "Coloque um valor válido!", 422)

export const errUserIncorrect = new Errors().createError("Valores Inválidos", "E-mail ou senha incorretos!", 404)

export const errLogIn = new Errors().createError("Falha na requisição", "Ocorreu um erro ao realizar o login!", 500)

export const errTokenInvalid = new Errors().createError("Token Inválido", "Este token ja expirou ou não existe, tente logar novamente!", 401)

export const errNeedsToken = new Errors().createError("Token Inválido", "Insira um token para prosseguir", 401)

export const errCreateTeam = new Errors().createError("Falha no cadastro", "Ocorreu um erro ao cadastrar a equipe", 500)

export const errTeamsNotFound = new Errors().createError("Falha na requisição", "Nenhum time foi encontrado!", 404)

export const errUpdateTeam = new Errors().createError("Falha na requisição", "Ocorreu um erro ao atualizar a equipe", 500)

export const errRemoveTeam = new Errors().createError("Falha na requisição", "Ocorreu um erro ao deletar a equipe", 500)

export const errUserIsAlreadyInTheTeam = new Errors().createError("Dados Inválidos", "Este usuário ja se encontra na equipe, adicione outro!", 422)

export const errAddMemberTeam = new Errors().createError("Falha na requisição", "ocorreu um erro ao adicionar este membro na equipe!", 500)

export const errUserIsntOnTheTeam = new Errors().createError("Dados Inválidos", "Este usuário não se encontra nesta equipe, digite novamente!", 422)

export const errRemoveMemberTeam = new Errors().createError("Falha na requisição", "ocorreu um erro ao remover este membro na equipe!", 500)
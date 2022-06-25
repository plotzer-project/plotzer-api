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

export const errUserValueNotFound = new Errors().createError("Falha na requisição", "Usuário não encontrado", 404)

export const errRemoveUser = new Errors().createError("Falha na requisição", "Ocorreu um erro ao deletar o usuário", 500)

export const errUpdateUser = new Errors().createError("Falha na requisição", "Ocorreu um erro ao atualizar o usuário", 500)

export const errPutValidData = new Errors().createError("Valores Inválidos", "Coloque um valor válido!", 422)
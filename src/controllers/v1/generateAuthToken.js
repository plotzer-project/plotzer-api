import {sign} from "../../services/v1/jwt.js"

class GenerateAuthToken {
  async generate(_id) {

    const token = sign({id: _id})

    return token;
  }
}

export { GenerateAuthToken };
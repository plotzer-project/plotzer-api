import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

const expiresIn = 60 * 60 * 24* 7
// const expiresIn = 100

export const sign = payload => jwt.sign(payload, secret, {expiresIn})
export const decode = token => jwt.verify(token, secret)
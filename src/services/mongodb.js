import mongoose from "mongoose"
export default mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@plotzer.zuj6p.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("conectado no mongodb")
    })
    .catch((err) => {
        console.log(err)
    })
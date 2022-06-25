import 'dotenv/config'; //informações privadas
import './services/mongodb.js'

/*
 * .env data:
 *
 * SERVER_URL=link
 * SERVER_PORT=porta
 * 
 * DB_USER='mongo db atlas user'
 * DB_PASS='mongo db atlas pass'
 * 
 * JWT_SECRET='caracteres aleatorios'
 */

import express from "express"
const app = express();

import cors from 'cors'; //habilita requisicao
import router from './routes/index.js' //rotas

app.use(express.json());

app.use((req, res, next)=>{
    // res.header("Access-Control-Allow-Origin", "http://localhost:3001")
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors());
    next()
})

app.use('/api', router)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`servidor iniciado em: ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`)
})
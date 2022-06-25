import 'dotenv/config'; //informações privadas

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
import mongoose from './services/mongodb.js'

import express from "express"
const app = express();

import cors from 'cors'; //habilita requisicao
import router from './routes/index.js' //rotas

app.use(express.json());
app.use(cors());

app.use('/api', router)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`servidor iniciado em: ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`)
})
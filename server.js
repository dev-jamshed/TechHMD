import dotenv from 'dotenv'
import http from 'http'
import app from './src/app.js'
import dbConnect from './src/config/db/mongo.config.js'
import { PRODUCTION, SERVER } from './src/utils/constants/global.js'

dotenv.config({ path:  "./.env"})

dbConnect(SERVER)


const HOST = process.env.HOST
const PORT = process.env.PORT
const PROTOCOL = process.env.PROTOCOL

const server = http.createServer(app)

server.listen({ port: PORT, host: HOST }, () => {
    console.log("--> Enviroment:", process.env.ENV + "\n" + `--> URL: ${PROTOCOL}://${HOST}:${PORT}`)
})

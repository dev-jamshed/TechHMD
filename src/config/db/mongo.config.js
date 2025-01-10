import mongoose from 'mongoose'
import { CONNECTION_ESTABLISHED, CONNECTION_ERROR } from '../../utils/constants/message.js'

let dbConnect = async (establishedBy) => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`--> MongoDB ${CONNECTION_ESTABLISHED} ${establishedBy}`)
        })
        .catch(e => {
            console.log(`--> ${CONNECTION_ERROR} \n Message: ${e.message} \n Code: ${e.code}`)
        })
    return false
}

export default dbConnect
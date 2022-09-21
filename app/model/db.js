const mongoose = require('mongoose')
mongoose.Promise = global.Promise

let isConnected
const connectToDatabase = async () => {
    if (isConnected) {
        return Promise.resolve()
    }

    const db = await mongoose.connect(
        'mongodb+srv://gomez:I2jj0G91QthFo46K@cluster0.ijdbw.mongodb.net/voces?retryWrites=true&w=majority'
    )
    isConnected = db.connections[0].readyState
}

module.exports = connectToDatabase

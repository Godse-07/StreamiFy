const mongoose = require('mongoose');

const mongoConnection = async ()=>{
    const dbUrl = process.env.MONGO_URL;
    mongoose.connect(`${dbUrl}/StreamiFy?retryWrites=true&w=majority&appName=Cluster0`).
    then(() => {
        console.log('✅✅ Connected to MongoDB');
    }).catch((err) => {
        console.error('❌❌ Error connecting to MongoDB:', err);
    });
}

module.exports = mongoConnection;
const monggose = require('mongoose');

const mongoConnection = async ()=>{
    monggose.connect(`${process.env.MONGO_URL}/StreamiFy`).
    then(() => {
        console.log('✅✅ Connected to MongoDB');
    }).catch((err) => {
        console.error('❌❌ Error connecting to MongoDB:', err);
    });
}

module.exports = mongoConnection;
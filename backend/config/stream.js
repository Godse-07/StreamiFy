require('dotenv').config();
const streamChat = require('stream-chat').StreamChat;

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("Stream api key and secret are required");
}

const streamClient = streamChat.getInstance(apiKey, apiSecret);

const upsertStreamUser = async (userData) =>{
    try{
        await streamClient.upsertUsers([userData]);
        console.log('Stream user created successfully:', userData);
        return userData;
    }catch(error){
        console.error('Error creating Stream user:', error);
        throw new Error('Failed to create Stream user');
    }
}

const generateStreamToken = (userId) => {}


module.exports = {
    upsertStreamUser,
    generateStreamToken
}
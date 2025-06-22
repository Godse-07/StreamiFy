const bcrypt = require('bcryptjs');

const passwordEncryption = async (password)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch(error){
        console.error('Password encryption failed:', error);
        throw new Error('Password encryption failed');
    }
}

module.exports = passwordEncryption;
require('dotenv').config();
const express = require('express');
const router = require('./routes/authRoute');
const mongoConnection = require('./config/db');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router)

app.use("/api/users", userRoutes);

app.use("/api/chat", chatRoutes);


mongoConnection().then(()=>{
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    })
})

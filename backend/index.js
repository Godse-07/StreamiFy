require('dotenv').config();
const express = require('express');
const router = require('./routes/authRoute');
const mongoConnection = require('./config/db');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const cors = require('cors');

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://streami-fy-ten.vercel.app',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}))

app.use("/api/auth", router)

app.use("/api/users", userRoutes);

app.use("/api/chat", chatRoutes);


mongoConnection().then(()=>{
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    })
})

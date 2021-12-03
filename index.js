const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');    
const authRoute = require('./routes/auth');    

dotenv.config();

mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => {
        console.log("Connected to MongoDB");
});

//midleware
app.use(express.json());
app.use(helmet());
// app.use(morgan("common"));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(port, () => console.log(`Backend server is listening at http://localhost:${port}`));
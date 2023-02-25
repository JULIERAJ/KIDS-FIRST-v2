

/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const jwtMiddleware = require('./middleware/jwt');


const familyRoutes = require('./routes/family');
const forgetPasswordRoutes = require('./routes/forget-password');
const invitationRoutes = require('./routes/invitation');
const loginRoutes = require('./routes/login');
const memberRoutes = require('./routes/member');
const registerRoutes = require('./routes/register');

const logout = require('./routes/logout');


const resetPasswordRoutes = require('./routes/reset-password');
require('dotenv').config({ path: './.env.local' });


const mongoDB = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const app = express();

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error) => console.log('MongoDB connection error:', error));

db.once('connected', () => console.log('Database Connected'));

morgan.token('body', req => `\x1b[36m"body": ${JSON.stringify(req.body)}\x1b[0m \n`);



// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(morgan(':body'));
app.use(cookieParser());

app.use(jwtMiddleware());

app.use('/api', logout);
app.use('/api', familyRoutes);
app.use('/api', invitationRoutes);
app.use('/api', loginRoutes);
app.use('/api', memberRoutes);
app.use('/api', registerRoutes);
app.use('/api', forgetPasswordRoutes);
app.use('/api', resetPasswordRoutes);


//for testing jwt middleware
app.get('/api/test', (req, res) => {
    req.cookies.title = 'jwt';
    console.log("token is:"+req.cookies.jwt);
    console.log("my user info is:"+JSON.stringify(req.user));
    res.status(200).json({ success: true }); 
});

//for testing unless part in jwt middleware
app.get('/api/family', (req, res) => {
    res.status(200).json({ success: true });
});


app.listen(PORT, () => console.log(`server started on ${PORT}`));

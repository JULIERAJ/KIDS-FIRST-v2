

/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const cookieParser = require('cookie-parser')
const jwt = require('./middleware/jwt');


const familyRoutes = require('./routes/family');
const invitationRoutes = require('./routes/invitation');
const loginRoutes = require('./routes/login');
const memberRoutes = require('./routes/member');
const registerRoutes = require('./routes/register');
//const auth = require('./routes/auth');
const logout = require('./routes/logout');


require('dotenv').config({path: './.env.local'});

const mongoDB = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const app = express();

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error) => console.log('MongoDB connection error:', error));

db.once('connected', () => console.log('Database Connected'));

morgan.token('body', req => `\x1b[36m"body": ${JSON.stringify(req.body)}\x1b[0m \n`);


app.use(cookieParser());
app.use(jwt());

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(morgan(':body'));

//app.use('/api', auth);
app.use('/api', logout);



app.use('/api', familyRoutes);
app.use('/api', invitationRoutes);
app.use('/api', loginRoutes);
app.use('/api', memberRoutes);
app.use('/api', registerRoutes);

app.listen(PORT, () => console.log(`server started on ${PORT}`));

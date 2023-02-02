/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const familyRoutes = require('./routes/family');
const forgetPasswordRoutes = require('./routes/forget-password');
const invitationRoutes = require('./routes/invitation');
const loginRoutes = require('./routes/login');
const memberRoutes = require('./routes/member');
const registerRoutes = require('./routes/register');
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

app.use('/api', familyRoutes);
app.use('/api', invitationRoutes);
app.use('/api', loginRoutes);
app.use('/api', memberRoutes);
app.use('/api', registerRoutes);
app.use('/api', forgetPasswordRoutes);
app.use('/api', resetPasswordRoutes);

app.listen(PORT, () => console.log(`server started on ${PORT}`));

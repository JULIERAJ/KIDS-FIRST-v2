/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { Server } = require('socket.io');

const conversationRoutes = require('./routes/conversations');
const familyRoutes = require('./routes/family');
const forgetPasswordRoutes = require('./routes/forget-password');
// const invitationRoutes = require('./routes/invitation');
const loginRoutes = require('./routes/login');
const memberRoutes = require('./routes/member');
const messagesRoutes = require('./routes/messages');
const registerRoutes = require('./routes/register');
const resetPasswordRoutes = require('./routes/reset-password');

require('dotenv').config({ path: './.env.local' });

const mongoDB = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

const app = express();

mongoose.set('strictQuery', true);

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error) => console.log('MongoDB connection error:', error));

db.once('connected', () => console.log('Database Connected'));

morgan.token(
  'body',
  (req) => `\x1b[36m"body": ${JSON.stringify(req.body)}\x1b[0m \n`
);

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(morgan(':body'));

app.use('/api', familyRoutes);
// app.use('/api', invitationRoutes);
app.use('/api', loginRoutes);
app.use('/api', memberRoutes);
app.use('/api', registerRoutes);
app.use('/api', forgetPasswordRoutes);
app.use('/api', resetPasswordRoutes);
app.use('/api', conversationRoutes);
app.use('/api', messagesRoutes);

const server = app.listen(PORT, () => console.log(`server started on ${PORT}`));

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('sendMessage', (message) => {
    // Handle the received message
    console.log('Received message:', message);

    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

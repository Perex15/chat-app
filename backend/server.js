const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI);

app.use(helmet());
app.use(xss());
app.use(cors());
app.use(express.json());
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }), authRoutes);

io.on('connection', (socket) => {
  socket.on('send_message', async (data) => {
    const message = new Message(data);
    await message.save();
    io.emit('receive_message', data);
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));

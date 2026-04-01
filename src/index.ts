import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
const app: Express = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/minyan-finder';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);
  socket.on('user:location', (data) => {
    io.emit('location:update', { userId: socket.id, location: data, timestamp: new Date(), });
  });
  socket.on('minyan:create', (data) => {
    io.emit('minyan:new', { id: socket.id, ...data, timestamp: new Date(), });
  });
  socket.on('minyan:join', (data) => {
    io.emit('minyan:joined', { minyanId: data.minyanId, userId: socket.id, timestamp: new Date(), });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    io.emit('user:offline', { userId: socket.id });
  });
});
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
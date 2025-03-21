import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth'
import { initializeChatSocket } from './sockets/chatSocket';
import messageRoutes from './routes/messageRoutes';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/messages', messageRoutes);

initializeChatSocket(io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
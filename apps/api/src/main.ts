import http from 'http';
import { Server } from 'socket.io';

import app from './app';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

/**
 ** Creating a http server with the express app.
 **/
const server = http.createServer(app);

// Socket initialization
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

app.get('/', (req, res) => {
  res.send('Home');
});

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

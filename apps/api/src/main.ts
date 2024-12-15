import app from './app';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get('/', (req, res) => {
  res.send('Home');
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

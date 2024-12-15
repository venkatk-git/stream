import express from 'express';

import authRouter from './routes/auth.router';

const app = express();

// Authentication
app.use('/auth', authRouter);

export default app;

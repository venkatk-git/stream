import { Router } from 'express';

const router = Router();

router.get(
  '/protected',
  (req, res, next) => {
    if (!req.headers.cookie) {
      res.redirect('/auth/google');
      return;
    }

    next();
  },
  (req, res) => {
    res.send('This is a session protected page.');
  }
);

export default router;

import { Router } from 'express';
import { ExtendedRequest } from '../lib/types';

const router = Router();

router.get(
  '/protected',
  (req: ExtendedRequest, res, next) => {
    if (!req.user) {
      res.status(401).redirect('/auth/google');
      return;
    }

    next();
  },
  (req: ExtendedRequest, res) => {
    console.log(req.user);

    res.send(`Hii ${req.user.username}!! This is a session protected page.`);
  }
);

export default router;

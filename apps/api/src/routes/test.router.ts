import { Router } from 'express';
import { ExtendedRequest } from '../lib/types';

const router = Router();

router.get('/protected', (req: ExtendedRequest, res) => {
  console.log(req.session.user);

  if (req.session.user) {
    res.send(`Hello, ${req.session.user.username}`);
  } else {
    console.error('Not Working');
    res.status(401).redirect('/auth/google');
  }
});

export default router;

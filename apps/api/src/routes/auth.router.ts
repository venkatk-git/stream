import { Router } from 'express';
import passport from '../config/passport.config';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/cb',
  passport.authenticate('google', {
    failureRedirect: '/auth/google',
  }),
  (req, res) => {
    req.session['user'] = req.user['user'];
    res.redirect('/protected');
  }
);

export default router;

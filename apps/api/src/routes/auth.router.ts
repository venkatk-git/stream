import { Router } from 'express';
import passport from '../config/passport.config';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get('/google/cb', passport.authenticate('google'), (req, res) => {
  res.redirect('/protected');
});


export default router;

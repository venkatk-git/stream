import { Request } from 'express';

export type User = {
  _id: string;
  username: string;
  googleId: string;
};

export type ExtendedRequest = Request & {
  session: {
    user: string;
  };
  user: {
    username: string;
    googleId: string;
  };
};

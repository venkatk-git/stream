import { Request } from 'express';
import { Socket } from 'socket.io';

export type User = {
  _id: string;
  username: string;
  googleId: string;
};

export type RequestUser = {
  username: string;
  googleId: string;
};

export type ExtendedRequest = Request & {
  session: {
    passport?: {
      user: string;
    };
  };
  user?: RequestUser;
};

export type ExtendedSocket = Socket & {
  request: {
    sessionID: string;
    session: {
      passport?: {
        user: string;
      };
    };
    user?: RequestUser;
  };
};

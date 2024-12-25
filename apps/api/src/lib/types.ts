import { Request } from 'express';
import { Socket } from 'socket.io';

export type User = {
  id: string;
  username: string;
  googleId: string;
};

export type RequestUser = {
  id: string;
  username: string;
  googleId: string;
};

export type ExtendedRequest = Request & {
  session: {
    passport?: {
      user: string;
    };
    user: RequestUser;
  };

  user: RequestUser;
};

export type ExtendedSocket = Socket & {
  request: {
    sessionID: string;

    session: {
      passport?: {
        user: string;
      };
      user: RequestUser;
    };
  };

  user: RequestUser;
};

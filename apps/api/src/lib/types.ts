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
  profileImg: string;
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
      roomId?: string;
    };
  };

  user: RequestUser;
};

export interface ApiResponse {
  success: boolean;
  error: null | {
    message: string;
  };
}

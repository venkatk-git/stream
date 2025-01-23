export type UserData = {
  username: string;
  googleId: string;
  id: string;
  profileImg: string;
};
export type ApiResponse = {
  success: boolean;
  error: string | null;
  data: UserData;
};

export type AccountState = {
  isValid: boolean;
  account: UserData | null;
};

export type ApiResponseRoom = {
  success: boolean;
  error: string | null;
  data: {
    roomId: string;
  } | null;
};

export type Member = {
  name: string;
  memberId: string;
  profileImg: string;
};

export type VideoQueue = Video[];

export interface Video {
  videoId: string;
  title: string;
}

export interface LoadVideo extends Video {
  timeStamp: number;
}

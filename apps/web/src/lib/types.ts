export type UserData = {
  username: string;
  googleId: string;
  id: string;
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

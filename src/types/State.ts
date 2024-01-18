export type AppState = {
  username: string | null;
  userType: UserTypeEnum;
  useDarkmode: boolean;
};

export const enum UserTypeEnum {
  SignedOut,
  User,
  Moderator,
  Admin,
}
export interface AppContextProps {
  state: AppState | null;
  setState: (state: AppState) => void;
}

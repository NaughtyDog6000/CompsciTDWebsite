import { AppContext } from "@/App";
import { useContext } from "react";

export type AppState = {
  token: string | null;
  username: string | null;
  userType: UserTypeEnum;
  DebugMode: boolean;
  useDarkmode: boolean;
  SignoutDialogOpen: boolean;
};

export const DefaultAppState: AppState = {
  token: null,
  username: null,
  userType: UserTypeEnum.SignedOut,
  DebugMode: false,
  useDarkmode: false,
  SignoutDialogOpen: false,
};

export const enum UserTypeEnum {
  SignedOut = 0,
  User = 1,
  Moderator = 2,
  Admin = 3,
}
export interface AppContextProps {
  AppState: AppState;
  SetAppState: (state: AppState) => void;
}

export function useAppState(): AppContextProps {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "the App context was not provided, appstate can only be used where it is provided"
    );
  }
  return context;
}

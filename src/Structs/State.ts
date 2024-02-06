import { APIContext, AppContext } from "@/App";
import { CustomDialogProps } from "@/components/CustomDialog";
import { useContext } from "react";
import { CompsciAPI } from "@/lib/APICALLS";

export type AppState = {
  username: string | null;
  userType: UserTypeEnum;
  DebugMode: boolean;
  useDarkmode: boolean;
  SignoutDialogOpen: boolean;
};

export const DefaultAppState: AppState = {
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

export function useAPI(): CompsciAPI {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error(
      "the API context was not provided, API can only be used where it is provided"
    );
  }
  return context;
}

export interface CustomDialogContextProps {
  CustomDialogQueue: CustomDialogProps[];
  SetCustomDialogQueue: (state: CustomDialogProps[]) => void;
}

import { UserTypeEnum, useAppState } from "@/Structs/State";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({
  children,
  RequiredAuth = UserTypeEnum.User,
  fallbackPath = "/signin",
}: {
  children: ReactElement;
  RequiredAuth?: UserTypeEnum;
  fallbackPath?: string;
}) => {
  const { AppState } = useAppState();

  return AppState.userType >= RequiredAuth ? (
    children
  ) : (
    <Navigate to={fallbackPath} />
  );
};

export const SignedOutRoute = ({
  children,
  fallbackPath = "/Profile",
}: {
  children: ReactElement;
  fallbackPath: string;
}) => {
  const { AppState } = useAppState();

  return AppState.userType === UserTypeEnum.SignedOut ? (
    children
  ) : (
    <Navigate to={fallbackPath} />
  );
};

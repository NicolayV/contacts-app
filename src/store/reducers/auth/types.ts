import { IUser } from "../../../models/IUser";
export interface AuthState {
  isAuth: boolean;
  user: IUser;
  isLoadingAuth: boolean;
  errorAuth: string;
}

export enum AuthActionEnum {
  SET_AUTH = "SET_AUTH",
  SET_USER = "SET_USER",
  SET_IS_LOADING_AUTH = "SET_IS_LOADING_AUTH",
  SET_ERROR_AUTH = "SET_ERROR_AUTH",
}

export interface SetAuthAction {
  type: AuthActionEnum.SET_AUTH;
  payload: boolean;
}
export interface SetUserAuthAction {
  type: AuthActionEnum.SET_USER;
  payload: IUser;
}
export interface SetIsLoadingAuthAction {
  type: AuthActionEnum.SET_IS_LOADING_AUTH;
  payload: boolean;
}
export interface SetErrorAuthAction {
  type: AuthActionEnum.SET_ERROR_AUTH;
  payload: string;
}
export type AuthAction =
  | SetAuthAction
  | SetUserAuthAction
  | SetIsLoadingAuthAction
  | SetErrorAuthAction;

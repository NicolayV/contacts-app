import { IUser } from "../../../models/IUser";
import { AuthAction, AuthActionEnum, AuthState } from "./types";

const initialState: AuthState = {
  isAuth: false,
  user: {} as IUser,
  isLoadingAuth: false,
  errorAuth: "",
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH:
      return { ...state, isAuth: action.payload };
    case AuthActionEnum.SET_USER:
      return { ...state, user: action.payload };
    case AuthActionEnum.SET_IS_LOADING_AUTH:
      return { ...state, isLoadingAuth: action.payload };
    case AuthActionEnum.SET_ERROR_AUTH:
      return { ...state, errorAuth: action.payload };
    default:
      return state;
  }
};

export default authReducer;

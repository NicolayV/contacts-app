import { AppDispatch } from "./../../index";
import { AuthAction, AuthActionEnum } from "./types";
import { IUser } from "../../../models/IUser";
import { fetchUsers } from "../../../api/userService";
export const AuthActionCreators = {
  setUser: (user: IUser): AuthAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),

  setIsAuth: (auth: boolean): AuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),

  setIsLoadingAuth: (payload: boolean): AuthAction => ({
    type: AuthActionEnum.SET_IS_LOADING_AUTH,
    payload,
  }),

  setErrorAuth: (payload: string): AuthAction => ({
    type: AuthActionEnum.SET_ERROR_AUTH,
    payload,
  }),

  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoadingAuth(true));

        setTimeout(async () => {
          const response = await fetchUsers();
          const regUser = response.data.find(
            (user) => user.username === username && user.password === password
          );
          //
          if (regUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", regUser.username);
            //
            dispatch(AuthActionCreators.setUser(regUser));
            dispatch(AuthActionCreators.setIsAuth(true));
          } else {
            dispatch(
              AuthActionCreators.setErrorAuth("Некорректный логи или пароль")
            );
          }
          dispatch(AuthActionCreators.setIsLoadingAuth(false));
        }, 1000);
      } catch (e) {
        dispatch(
          AuthActionCreators.setErrorAuth("Произошла ошибка при логине")
        );
      }
    },

  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    //
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};

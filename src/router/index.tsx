import Login from "../pages/Login";
import { Navigate } from "react-router-dom";
import Contacts from "../pages/Contacts";

export interface IRoute {
  id: number;
  path: string;
  element: JSX.Element;
}

export enum RouterNames {
  LOGIN = "/login",
  CONTACTS = "/contacts",
  REDIRECT = "*",
}

export const publicRoutes: IRoute[] = [
  { id: 0, path: RouterNames.LOGIN, element: <Login /> },
  {
    id: 1,
    path: RouterNames.REDIRECT,
    element: <Navigate to={RouterNames.LOGIN} />,
  },
];
export const privateRoutes: IRoute[] = [
  { id: 1, path: RouterNames.CONTACTS, element: <Contacts /> },
  {
    id: 2,
    path: RouterNames.REDIRECT,
    element: <Navigate to={RouterNames.CONTACTS} />,
  },
];

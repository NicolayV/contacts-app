import axios, { AxiosResponse } from "axios";
import { IContact } from "../models/IContact";
import { IUser } from "../models/IUser";

export const fetchUsers = async (): Promise<AxiosResponse<IUser[]>> =>
  axios.get<IUser[]>("http://localhost:3030/users");

export const fetchContacts = async (): Promise<AxiosResponse<IContact[]>> =>
  axios.get<IContact[]>("http://localhost:3030/contacts");

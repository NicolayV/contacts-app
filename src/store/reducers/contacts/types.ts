import { IContact } from "../../../models/IContact";

export interface ContactsState {
  contacts: Array<IContact>;
  isLoadingContacts: boolean;
  errorContacts: string;
}

export enum ContactsActionEnum {
  SET_CONTACTS = "SET_CONTACTS",
  SET_IS_LOADING_CONTACTS = "SET_IS_LOADING_CONTACTS",
  SET_ERROR_CONTACTS = "SET_ERROR_CONTACTS",
}

export interface SetContactsAction {
  type: ContactsActionEnum.SET_CONTACTS;
  payload: Array<IContact>;
}
export interface SetIsLoadingContactsAction {
  type: ContactsActionEnum.SET_IS_LOADING_CONTACTS;
  payload: boolean;
}
export interface SetErrorContactsAction {
  type: ContactsActionEnum.SET_ERROR_CONTACTS;
  payload: string;
}
export type ContactsAction =
  | SetContactsAction
  | SetIsLoadingContactsAction
  | SetErrorContactsAction;

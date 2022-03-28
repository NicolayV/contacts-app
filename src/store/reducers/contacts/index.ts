// import { IPosts } from "../../../models/IPosts";
import { ContactsAction, ContactsActionEnum, ContactsState } from "./types";

const initialState: ContactsState = {
  contacts: [],
  isLoadingContacts: false,
  errorContacts: "",
};

export default function contactsReducer(
  state = initialState,
  action: ContactsAction
): ContactsState {
  switch (action.type) {
    case ContactsActionEnum.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };

    case ContactsActionEnum.SET_IS_LOADING_CONTACTS:
      return {
        ...state,
        isLoadingContacts: action.payload,
      };

    case ContactsActionEnum.SET_ERROR_CONTACTS:
      return {
        ...state,
        errorContacts: action.payload,
      };

    default:
      return state;
  }
}

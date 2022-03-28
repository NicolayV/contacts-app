import { fetchContacts } from "../../../api/userService";
import { IContact } from "../../../models/IContact";
import { AppDispatch } from "../../index";
import { ContactsActionEnum, ContactsAction } from "./types";

export const ContactsActionCreators = {
  setContacts: (contacts: Array<IContact>): ContactsAction => ({
    type: ContactsActionEnum.SET_CONTACTS,
    payload: contacts,
  }),

  setIsLoadingContacts: (payload: boolean): ContactsAction => ({
    type: ContactsActionEnum.SET_IS_LOADING_CONTACTS,
    payload,
  }),

  setErrorContacts: (payload: string): ContactsAction => ({
    type: ContactsActionEnum.SET_ERROR_CONTACTS,
    payload,
  }),

  getContacts: () => async (dispatch: AppDispatch) => {
    try {
      const response = await fetchContacts();
      dispatch(ContactsActionCreators.setIsLoadingContacts(true));

      setTimeout(async () => {
        dispatch(ContactsActionCreators.setContacts(response.data));
        dispatch(ContactsActionCreators.setIsLoadingContacts(false));
      }, 1000);
    } catch (e) {
      dispatch(
        ContactsActionCreators.setErrorContacts(
          "Произошла ошибка при получении контактов"
        )
      );
    }
  },
};

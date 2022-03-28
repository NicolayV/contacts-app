import { AuthActionCreators } from "./auth/action-creators";
import { ContactsActionCreators } from "./contacts/action-creators";

export const allActionCreators = {
  ...AuthActionCreators,
  ...ContactsActionCreators,
};

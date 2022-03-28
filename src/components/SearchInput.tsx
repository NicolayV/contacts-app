import { FC, useState } from "react";
import { Input } from "antd";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IContact } from "../models/IContact";

const { Search } = Input;

interface ISearchInput {
  contacts: IContact[];
  setSearch: (el: IContact[]) => void;
}

const style = { minWidth: 250, width: 350 };

export const SearchInput: FC<ISearchInput> = ({ contacts, setSearch }) => {
  const { isLoadingContacts, errorContacts } = useTypedSelector(
    (state) => state.contacts
  );
  const [loading, setLoading] = useState(false);

  const onSearch = (value: string) => {
    setLoading(true);
    const filter = contacts.filter((item) =>
      item.name.toLowerCase().includes(value.toString().toLowerCase())
    );

    setSearch(filter);
    setTimeout(() => setLoading(false), 700);
  };

  return (
    <Search
      onSearch={onSearch}
      disabled={isLoadingContacts && !errorContacts}
      loading={loading}
      style={style}
      placeholder="Поиск"
      enterButton
      allowClear
    />
  );
};

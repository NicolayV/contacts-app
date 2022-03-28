import { FC, useEffect, useState } from "react";
import { List, Divider, Card, Layout, Spin, Button, Row } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddContactForm from "../components/AddContactForm";
import confirmModal from "../components/confirmModal";
import { SearchInput } from "../components/SearchInput";
import EditContactForm from "../components/EditContactForm";
import { IContact } from "../models/IContact";

const Contacts: FC = () => {
  const { getContacts, setContacts } = useActions();
  const { contacts, isLoadingContacts, errorContacts } = useTypedSelector(
    (state) => state.contacts
  );

  const [sortedList, setSortedList] = useState<Array<IContact>>([]);
  const [currentContact, setCurrentContact] = useState<IContact>(
    {} as IContact
  );

  const [visibleAddContact, setVisibleAddContact] = useState(false);
  const [visibleEditContact, setVisibleEditContact] = useState(false);

  useEffect(() => {
    if (!contacts.length) {
      getContacts();
    }
    setSortedList(contacts);
  }, [contacts]);

  const onDeleteContact = (id: number | string) => {
    const withoutDeletedPost = sortedList.filter((item) => item.id !== id);
    setContacts(withoutDeletedPost);
  };

  return (
    <Layout>
      <Divider orientation="left">Список контактов</Divider>
      {isLoadingContacts && errorContacts ? (
        <Spin size="large" tip="Loading..." />
      ) : (
        <>
          <Row style={{ padding: "0 10px" }}>
            <SearchInput contacts={contacts} setSearch={setSortedList} />
            <Button
              style={{ width: 180, marginLeft: 10 }}
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              onClick={() => setVisibleAddContact(true)}
            >
              Добавить контакт
            </Button>
          </Row>

          <Divider />
          <Row style={{ padding: "0 10px" }}>
            <List
              grid={{
                gutter: 9,
                column: 3,
              }}
              dataSource={sortedList}
              pagination={sortedList as {}}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    hoverable
                    actions={[
                      <DeleteOutlined
                        key="delete"
                        onClick={() => confirmModal(item.id, onDeleteContact)}
                      />,
                      <EditOutlined
                        key="edit"
                        onClick={() => {
                          setCurrentContact(item);
                          setVisibleEditContact(true);
                        }}
                      />,
                    ]}
                  >
                    <Card.Meta
                      style={{ height: 80 }}
                      title={`Имя: ${item?.name}`}
                      description={`тел: ${item?.phone}`}
                    />
                  </Card>
                </List.Item>
              )}
              footer={<Divider />}
            />
          </Row>
          <AddContactForm
            visible={visibleAddContact}
            setVisible={setVisibleAddContact}
            contacts={contacts}
            setContacts={setContacts}
          />
          <EditContactForm
            visible={visibleEditContact}
            setVisible={setVisibleEditContact}
            contacts={contacts}
            setContacts={setContacts}
            currentContact={currentContact}
          />
        </>
      )}
    </Layout>
  );
};

export default Contacts;

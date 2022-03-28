import { FC } from "react";
import { Button, Form, Input, Modal } from "antd";
import { rules } from "../utils/rules";
import { EditOutlined } from "@ant-design/icons";
import { IContact } from "../models/IContact";

interface IEditContact {
  visible: boolean;
  setVisible: (el: boolean) => void;
  contacts: IContact[];
  setContacts: (el: Array<IContact>) => void;
  currentContact: IContact;
}

interface IOnFinish {
  editContactName: string;
  editContactPhone: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditContactForm: FC<IEditContact> = ({
  visible,
  setVisible,
  contacts,
  setContacts,
  currentContact,
}) => {
  const [form] = Form.useForm();
  const { name, phone, id } = currentContact;

  const onFinish = ({ editContactName, editContactPhone }: IOnFinish) => {
    const editContact = {
      id: id,
      name: editContactName,
      phone: editContactPhone,
    };

    const editContactsList = contacts.map((item) => {
      if (item.id === editContact.id) {
        return editContact;
      } else {
        return item;
      }
    });

    setContacts([...editContactsList]);
    form.resetFields();
    setVisible(false);
  };

  if (visible) {
    setTimeout(() => {
      form.resetFields();
      form.setFieldsValue({
        editContactName: name,
        editContactPhone: phone,
      });
    }, 0);
  }

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Изменить контакт"
      centered
      width={600}
      footer={null}
    >
      <Form onFinish={onFinish} name="editContact" form={form} {...layout}>
        <Form.Item
          label="Имя контакта"
          name="editContactName"
          rules={[rules.required("Обязательное поле")]}
        >
          <Input.TextArea maxLength={50} rows={1} showCount />
        </Form.Item>

        <Form.Item
          label="Телефон"
          name="editContactPhone"
          rules={[rules.required("Обязательное поле")]}
        >
          <Input.TextArea
            placeholder="Длина телефона 15 символов"
            maxLength={30}
            rows={1}
            showCount
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            icon={<EditOutlined />}
          >
            Изменить контакт
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditContactForm;

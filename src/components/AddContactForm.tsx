import { FC } from "react";
import { Button, Form, Input, Modal } from "antd";
import { rules } from "../utils/rules";
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined } from "@ant-design/icons";
import { IContact } from "../models/IContact";

interface IAddContact {
  visible: boolean;
  setVisible: (el: boolean) => void;
  contacts: IContact[];
  setContacts: (el: IContact[]) => void;
}

interface IOnFinish {
  contactName: string;
  contactPhone: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddContactForm: FC<IAddContact> = ({
  visible,
  setVisible,
  contacts,
  setContacts,
}) => {
  const [form] = Form.useForm();

  const onFinish = ({ contactName, contactPhone }: IOnFinish) => {
    const newContact = {
      id: uuidv4(),
      name: contactName,
      phone: contactPhone,
    };
    setContacts([...contacts, newContact]);
    form.resetFields();
    setVisible(false);
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Добавить контакт"
      centered
      width={600}
      footer={null}
    >
      <Form onFinish={onFinish} name="addContact" form={form} {...layout}>
        <Form.Item
          label="Имя"
          name="contactName"
          rules={[rules.required("Обязательное поле")]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="contactPhone"
          rules={[rules.required("Обязательное поле")]}
        >
          <Input.TextArea
            placeholder="Длина телефона 15 символов"
            maxLength={15}
            rows={2}
            showCount
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            icon={<PlusOutlined />}
          >
            Добавить контакт
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddContactForm;

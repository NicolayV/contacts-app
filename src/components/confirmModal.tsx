import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

interface IConfirmModal {
  (id: number | string, confirmedItem: (el: number | string) => void): void;
}

const confirmModal: IConfirmModal = (id, confirmedItem) => {
  confirm({
    title: "Удалить карточку контакта?",
    icon: <ExclamationCircleOutlined />,
    okText: "Да",
    okType: "danger",
    cancelText: "Нет",
    onOk() {
      confirmedItem(id);
    },
  });
};

export default confirmModal;

import { Form, Input, Button } from "antd";
import { FC, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { rules } from "../utils/rules";

const LoginForm: FC = () => {
  const { login } = useActions();
  const { errorAuth, isLoadingAuth } = useTypedSelector((state) => state.auth);

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submit = () => {
    login(user, password);
  };

  return (
    <Form onFinish={submit}>
      {errorAuth && <div style={{ color: "red" }}>{errorAuth}</div>}
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[rules.required("Введите имя!")]}
      >
        <Input value={user} onChange={(e) => setUser(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required("Введите пароль!")]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoadingAuth}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

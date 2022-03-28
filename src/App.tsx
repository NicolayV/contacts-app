import React, { FC, useEffect } from "react";
import { Layout } from "antd";
import AppRouter from "./router/appRouter";
import Navbar from "./components/Navbar";
import "./App.css";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";
import { useTypedSelector } from "./hooks/useTypedSelector";

const App: FC = () => {
  const { setUser, setIsAuth } = useActions();
  const { isAuth } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("auth") && !isAuth) {
      setUser({ username: localStorage.getItem("username" || "") } as IUser);
      setIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;

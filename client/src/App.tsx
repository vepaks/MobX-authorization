import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {User} from "./models/User";

function App() {
    // правим проверка за наличие на данни на user
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

  return (
    <div className="App">
        <h1> {store.isAuth ? ` ${store.user.email} има авторизация` : 'Моля влезте в профила си' }</h1>
        <LoginForm/>
    </div>
  );
}

export default observer(App);

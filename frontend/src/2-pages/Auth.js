import React, { useEffect, useRef, useState } from "react";
import "../1-css/Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  loginUserHandler,
  registerUserHandler,
} from "../3-actions/userActions";

export default function Auth(props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const registerUser = useSelector((state) => state.registerUser);
  const {
    loading: loadingRegister,
    success: successRegister,
    error: errorRegister,
  } = registerUser;

  const loginUser = useSelector((state) => state.loginUser);
  const {
    loading: loadingLogin,
    success: successLogin,
    error: errorLogin,
  } = loginUser;

  const onSubmit = (data) => {
    console.log(data);
    const user = {
      username: data.username,
      password: data.password,
    };
    dispatch(loginUserHandler(user));
  };

  useEffect(() => {
    if (successLogin) {
      console.log(successLogin.message);
    }
    if (localStorage.getItem("token")) {
      console.log(props.history.push("/admin/mon-compte/contenu"));
    }
    return () => {};
  }, [successLogin]);
  return (
    <form className="auth" onSubmit={handleSubmit(onSubmit)}>
      <h2>Connexion</h2>
      <input {...register("username")} type="text" />
      <input {...register("password")} type="password" />
      <button type="submit">Valider</button>
    </form>
  );
}

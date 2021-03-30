import React, { useContext } from "react";
import Context from "../state/context";
import { Redirect } from "react-router-dom";
import Login from "../components/Auth/Login";

const Splash = () => {
  const { state } = useContext(Context);
  return state.isAuth ? <Redirect to="/" /> : <Login />;
};

export default Splash;

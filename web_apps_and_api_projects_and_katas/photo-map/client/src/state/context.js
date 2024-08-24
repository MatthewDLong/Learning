import { createContext } from "react";

const Context = createContext({
  user: null,
  isAuth: false,
  draft: null,
  pins: [],
  currentPin: null,
});

export default Context;

import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOG OUT":
      return { user: null };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });
  const [auth, setAuth] = useState({})

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log(state);

  console.log(auth)

  return (
    <AuthContext.Provider value={{ ...state, dispatch, auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initState;

    default:
      throw new Error("There are some errors in Auth Reducer");
  }
}

const FAKE_USER = {
  name: "Faker",
  email: "faker@example.com",
  password: "hide_on_bush",
  avator: "https://en.wikipedia.org/wiki/File:Faker_2020_interview.jpg",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={(user, isAuthenticated, login, logout)}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
}

export { AuthProvider, useAuth };

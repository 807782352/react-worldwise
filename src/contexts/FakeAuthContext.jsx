import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initState;
    case "loginError":
      return { ...initState, error: action.payload };

    default:
      throw new Error("There are some errors in Auth Reducer");
  }
}

// MOCK Authentication
const FAKE_USER = {
  name: "Faker",
  email: "faker@example.com",
  password: "hideonbush",
  avatar: "https://www.claviersouris.fr/wp-content/uploads/2022/10/62483ae709193b35ab993551_Faker.png",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initState
  );

  function login(email, password) {
    // small bug in error hint
    if (email !== FAKE_USER.email) {
      dispatch({ type: "loginError", payload: "The email does not exist!" });
    } else if (password !== FAKE_USER.password) {
      dispatch({ type: "loginError", payload: "The password does not match!" });
    } else if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ error, user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");

  return context;
}

export { AuthProvider, useAuth };

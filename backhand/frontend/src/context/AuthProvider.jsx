import React, { createContext, useState ,useContext} from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const  AuthProvider =({ children })=> {
  const initialUserState = Cookies.get("jwt") || localStorage.getItem("messager");
  // parse the user data and storing in state
  const [authuser, setAuthuser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );
  return (

<AuthContext.Provider value={{ authuser, setAuthuser }}>
  {children}
</AuthContext.Provider>


  );
}


export const useAuth =() =>useContext(AuthContext);


export default AuthProvider;

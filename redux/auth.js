
import AsyncStorage from "@react-native-async-storage/async-storage"
import AuthReducer from "./reducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: getuser() || null,
  isFetching: false,
  error: false,
  admin:false
};
async function getuser(){
  let token = await AsyncStorage.getItem('shopuser');
  if (token !== null||token!==undefined||token!=='')
  {
    const user= JSON.parse(token)
    return user
  }
  else
  {
    return null
  }
}
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    (async()=>{await AsyncStorage.setItem("shopuser", JSON.stringify(state.user))})
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
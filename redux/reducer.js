const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        admin:false
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        isFetching: false,
        error: false,
        admin:action.payload.admin
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        admin:false
      };
    case "LOGOUT":
      console.log("logout")
      return {
        user: null,
        isFetching: false,
        error: false,
        admin:false
      };
    default:
      return { ...state };
  }
};
export default AuthReducer
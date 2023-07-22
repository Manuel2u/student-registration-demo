export const actionTypes = {
  LOGIN_USER: "LOGIN_USER",
  SIGNUP_USER: "SIGNUP_USER",
  GET_USER: "GET_USER",
  GET_USER_FAILED: "GET_USER_FAILED",
  LOGOUT: "LOGOUT",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case actionTypes.GET_USER_FAILED:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;


  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_REGISTER_REQUEST":
        return { loading: true };
      case "USER_REGISTER_SUCCESS":
        return { loading: false, userInfo: action.payload };
      case "USER_REGISTER_FAIL":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };




  export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_UPDATE_REQUEST":
        return { loading: true };
      case "USER_UPDATE_SUCCESS":
        return { loading: false, success: true };
      case "USER_UPDATE_FAIL":
        return { loading: false, error: action.payload };
      case "USER_UPDATE_RESET":
        return {};
      default:
        return state;
    }
  };




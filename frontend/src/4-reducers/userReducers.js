const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, success: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_RESET":
      return {};
    default:
      return state;
  }
};

const userGetReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_GET_REQUEST":
      return { loading: true, user: {} };
    case "USER_GET_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_GET_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_SUCCESS":
      return { loading: false, success: action.payload };
    case "USER_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_RESET":
      return {};
    default:
      return state;
  }
};

const passwordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case "PASSWORD_RESET_REQUEST":
      return { loading: true };
    case "PASSWORD_RESET_SUCCESS":
      return { loading: false, success: action.payload };
    case "PASSWORD_RESET_FAIL":
      return { loading: false, error: action.payload };
    case "USER_RESET":
      return {};
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, success: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    case "USER_RESET":
      return {};
    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  passwordResetReducer,
  userGetReducer,
  userUpdateReducer,
};

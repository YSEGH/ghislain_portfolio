const sendEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "SEND_EMAIL_REQUEST":
      return { loading: true };
    case "SEND_EMAIL_SUCCESS":
      return { loading: false, success: action.payload };
    case "SEND_EMAIL_FAIL":
      return { loading: false, error: action.payload };
    case "SEND_EMAIL_RESET":
      return {};
    default:
      return state;
  }
};

export { sendEmailReducer };

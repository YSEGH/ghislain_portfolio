import axios from "axios";

const sendEmailHandler = (message) => async (dispatch) => {
  dispatch({ type: "SEND_EMAIL_REQUEST" });
  try {
    const { data } = await axios.post("/api/email/", message);
    dispatch({ type: "SEND_EMAIL_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SEND_EMAIL_FAIL", payload: error.response.data.message });
  }
};

const emailSuccessReset = () => (dispatch) => {
  dispatch({ type: "SEND_EMAIL_RESET" });
};

export { sendEmailHandler, emailSuccessReset };

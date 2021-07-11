import axios from "axios";

const loginUserHandler = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const { data } = await axios.post("/api/user/login", user);
    localStorage.setItem("token", data.token);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data.message });
  }
};

const registerUserHandler = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const { data } = await axios.post("/api/user/register", user);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export { loginUserHandler, registerUserHandler };

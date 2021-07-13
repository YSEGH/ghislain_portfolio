import axios from "axios";

const loginUserHandler = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const { data } = await axios.post("/api/user/login", user);
    localStorage.setItem("user", data.user._id);
    localStorage.setItem("token", data.token);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data.message });
  }
};

const getUserHandler = () => async (dispatch) => {
  dispatch({ type: "USER_GET_REQUEST" });
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    const { data } = await axios.get(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "USER_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_GET_FAIL", payload: error.response.data.message });
  }
};

const updateUserHandler = (user) => async (dispatch) => {
  dispatch({ type: "USER_UPDATE_REQUEST" });
  try {
    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    user._id = userId;
    const { data } = await axios.put("/api/user/", user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem("token", data.token);
    dispatch({ type: "USER_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload: error.response.data.message,
    });
  }
};

const resetPasswordHandler = () => async (dispatch) => {
  dispatch({ type: "PASSWORD_RESET_REQUEST" });
  try {
    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      "/api/user/reset-password",
      { userId: userId, password: "1234" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    localStorage.setItem("token", data.token);
    dispatch({ type: "PASSWORD_RESET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PASSWORD_RESET_FAIL",
      payload: error.response.data.message,
    });
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

const userReset = () => (dispatch) => {
  dispatch({ type: "USER_RESET" });
};

export {
  loginUserHandler,
  registerUserHandler,
  getUserHandler,
  updateUserHandler,
  resetPasswordHandler,
  userReset,
};

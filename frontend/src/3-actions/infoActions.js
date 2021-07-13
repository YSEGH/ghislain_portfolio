import axios from "axios";

const updateInfosHandler = (infos) => async (dispatch) => {
  dispatch({ type: "UPDATE_INFOS_REQUEST" });
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.put("/api/info/", infos, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "UPDATE_INFOS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UPDATE_INFOS_FAIL",
      payload: error.response.data.message,
    });
  }
};

const getInfosHandler = () => async (dispatch) => {
  dispatch({ type: "GET_INFOS_REQUEST" });
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("/api/info/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "GET_INFOS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_INFOS_FAIL", payload: error.response.data.message });
  }
};

const resetInfos = () => (dispatch) => {
  dispatch({ type: "RESET_INFOS" });
};

export { updateInfosHandler, getInfosHandler, resetInfos };

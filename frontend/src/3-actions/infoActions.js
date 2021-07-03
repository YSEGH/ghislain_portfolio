import axios from "axios";

const updateInfosHandler = (infos) => async (dispatch) => {
  dispatch({ type: "UPDATE_INFOS_REQUEST" });
  try {
    const { data } = await axios.put("/api/info/", infos);
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
    const { data } = await axios.get("/api/info/");
    dispatch({ type: "GET_INFOS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_INFOS_FAIL", payload: error.response.data.message });
  }
};

export { updateInfosHandler, getInfosHandler };

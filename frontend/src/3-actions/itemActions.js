import axios from "axios";

const addItemHandler = (item) => async (dispatch) => {
  dispatch({ type: "ADD_ITEM_REQUEST" });
  try {
    const { data } = await axios.post("/api/item/", item);
    dispatch({ type: "ADD_ITEM_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: "ADD_ITEM_FAIL", payload: error.response.data.message });
  }
};

const getItemsHandler = (contentType, categories) => async (dispatch) => {
  dispatch({ type: "GET_ITEM_REQUEST" });
  try {
    const { data } = await axios.get(`/api/item/${contentType}`, {
      params: categories,
    });
    dispatch({ type: "GET_ITEM_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: "GET_ITEM_FAIL",
      payload: error.response.data.message,
    });
  }
};

const updateItemHandler = (item) => async (dispatch) => {
  dispatch({ type: "UPDATE_ITEM_REQUEST" });
  try {
    const { data } = await axios.put(`/api/item/`, item);
    dispatch({ type: "UPDATE_ITEM_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "UPDATE_ITEM_FAIL",
      payload: error.response.data.message,
    });
  }
};

const deleteItemHandler = (itemId) => async (dispatch) => {
  dispatch({ type: "DELETE_ITEM_REQUEST" });
  try {
    const { data } = await axios.delete(`/api/item/${itemId}`);
    dispatch({ type: "DELETE_ITEM_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_ITEM_FAIL",
      payload: error.response.data.message,
    });
  }
};

const resetItemSuccess = () => (dispatch) => {
  dispatch({ type: "ITEM_RESET" });
};

export {
  getItemsHandler,
  addItemHandler,
  deleteItemHandler,
  updateItemHandler,
  resetItemSuccess,
};

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

const getItemsHandler =
  (contentType = null, filters = null, itemId = null) =>
  async (dispatch) => {
    dispatch({ type: "GET_ITEM_REQUEST" });
    try {
      const { data } = await axios.get(`/api/item/${contentType}`, {
        params: { filters, itemId },
      });
      dispatch({ type: "GET_ITEM_SUCCESS", payload: data });
      console.log(data);
    } catch (error) {
      dispatch({
        type: "GET_ITEM_FAIL",
        payload: error.response.data.message,
      });
    }
  };

const getFiltersHandler = (contentType) => async (dispatch) => {
  dispatch({ type: "GET_FILTERS_REQUEST" });
  try {
    const { data } = await axios.get(`/api/item/filters/${contentType}`);
    dispatch({ type: "GET_FILTERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_FILTERS_FAIL",
      payload: error.response.data.message,
    });
  }
};

const updateItemHandler =
  (itemId, item, filesToDelete = null) =>
  async (dispatch) => {
    dispatch({ type: "UPDATE_ITEM_REQUEST" });
    try {
      const { data } = await axios.put(`/api/item/`, item);

      if (filesToDelete.length) {
        const res = await axios.put(`/api/item/file-delete`, {
          itemId,
          filesToDelete,
        });
      }
      dispatch({ type: "UPDATE_ITEM_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "UPDATE_ITEM_FAIL",
        payload: error.response.data.message,
      });
    }
  };

const deleteFileHandler = (itemId, file) => async (dispatch) => {
  dispatch({ type: "DELETE_FILE_REQUEST" });
  try {
    const { data } = await axios.put(`/api/item/file-delete`, { itemId, file });
    dispatch({ type: "DELETE_FILE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_FILE_FAIL",
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
  getFiltersHandler,
  getItemsHandler,
  addItemHandler,
  deleteItemHandler,
  updateItemHandler,
  resetItemSuccess,
  deleteFileHandler,
};

import axios from "axios";

const addItemHandler = (item) => async (dispatch) => {
  dispatch({ type: "ADD_ITEM_REQUEST" });
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.post("/api/item/", item, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "ADD_ITEM_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_ITEM_FAIL", payload: error.response.data.message });
  }
};

const getItemsHandler =
  (
    contentType = null,
    offset = null,
    per_page = null,
    filters = null,
    itemId = null
  ) =>
  async (dispatch) => {
    dispatch({ type: "GET_ITEM_REQUEST" });
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`/api/item/${contentType}`, {
        params: { filters, itemId, offset, per_page },
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "GET_ITEM_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "GET_ITEM_FAIL",
        payload: error.response.data.message,
      });
    }
  };

const getFiltersHandler =
  (contentType, filters = null) =>
  async (dispatch) => {
    dispatch({ type: "GET_FILTERS_REQUEST" });
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`/api/item/filters/${contentType}`, {
        params: { filters },
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const token = localStorage.getItem("token");

      const { data } = await axios.put(`/api/item/`, item, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (filesToDelete && filesToDelete.length) {
        const res = await axios.put(
          `/api/item/file-delete`,
          {
            itemId,
            filesToDelete,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
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
    const token = localStorage.getItem("token");

    const { data } = await axios.put(
      `/api/item/file-delete`,
      { itemId, file },
      { headers: { Authorization: `Bearer ${token}` } }
    );
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
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`/api/item/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "DELETE_ITEM_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_ITEM_FAIL",
      payload: error.response.data.message,
    });
  }
};

const resetGetItem = () => (dispatch) => {
  dispatch({ type: "RESET_GET_ITEM" });
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
  resetGetItem,
};

const updateInfosReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_INFOS_REQUEST":
      return { loading: true };
    case "UPDATE_INFOS_SUCCESS":
      return { loading: false, success: true };
    case "UPDATE_INFOS_FAIL":
      return { loading: false, error: action.payload };
    case "UPDATE_INFOS_RESET":
      return {};
    default:
      return state;
  }
};

const getInfosReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case "GET_INFOS_REQUEST":
      return { loading: true, data: {} };
    case "GET_INFOS_SUCCESS":
      return { loading: false, data: action.payload };
    case "GET_INFOS_FAIL":
      return { loading: false, error: action.payload };
    case "GET_INFOS_RESET":
      return { data: {} };
    default:
      return state;
  }
};

export { updateInfosReducer, getInfosReducer };

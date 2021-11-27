import { POST_GET_LIST_SUCCESS_ADMIN } from "../../constants/ActionTypes";

const INITIAL_STATE = {
  postListAdmin: [],
  postPaginate: {},
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_GET_LIST_SUCCESS_ADMIN:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

import {
  POST_TYPE_CHANGE_STATE,
  POST_TYPE_GET_LIST,
  POST_TYPE_GET_LIST_SUCCESS,
} from "../../constants/ActionTypes";

const INITIAL_STATE = {
  postTypes: [],
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_TYPE_CHANGE_STATE: {
      return {
        ...state,
        ...payload,
      };
    }
    case POST_TYPE_GET_LIST_SUCCESS: {
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return state;
    }
  }
};

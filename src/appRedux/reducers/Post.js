import {
  POST_CHANGE_STATE,
  POST_GET_LIST_SUCCESS,
  POST_GET_ALL_SUCCESS,
  POST_COST_MIN_MAX_SUCCESS
} from "../../constants/ActionTypes";

const INITIAL_STATE = {
  minCost: 0,
  maxCost: 10000000,
  listLoad: false,
  actionLoad: false,
  postList: [],
  publicPostList: [],
  postPaginate: {},
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case POST_CHANGE_STATE: {
      return {
        ...state,
        ...payload,
      };
    }
    case POST_GET_LIST_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case POST_GET_ALL_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case POST_COST_MIN_MAX_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

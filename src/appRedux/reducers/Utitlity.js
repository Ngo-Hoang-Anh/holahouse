import {UTILITY_CHANGE_STATE, UTILITY_GET_LIST, UTILITY_GET_LIST_SUCCESS} from "../../constants/ActionTypes";

const INITIAL_STATE = {
  load: false,
  utilList: [],
  utilPaginate: {}
}

export default (state = INITIAL_STATE, action) => {
  const {payload, type} = action;
  switch (type) {
    case UTILITY_CHANGE_STATE: {
      return {
        ...state,
        ...payload
      }
    }
    case UTILITY_GET_LIST_SUCCESS: {
      return {
        ...state,
        ...payload
      }
    }
    default: {
      return state;
    }
  }
}

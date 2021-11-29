import {
  ROOM_TYPE_CHANGE_STATE,
  ROOM_TYPE_GET_LIST_SUCCESS,
} from "../../constants/ActionTypes";

const INITIAL_STATE = {
  roomTypes: [],
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case ROOM_TYPE_CHANGE_STATE: {
      return {
        ...state,
        ...payload,
      };
    }
    case ROOM_TYPE_GET_LIST_SUCCESS: {
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

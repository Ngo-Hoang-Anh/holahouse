import {
  INIT_URL,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
} from "../../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  initURL: "/",
  authUser: null,
  token: localStorage.getItem("token"),
  role: "",
};
try {
  INIT_STATE.authUser = JSON.parse(localStorage.getItem("username"));
} catch (e) {
  INIT_STATE.authUser = null;
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload.username,
        token: action.payload.token,
        role: action.payload.role,
      };
    }

    case INIT_URL: {
      return { ...state, initURL: action.payload };
    }

    case SIGNOUT_USER_SUCCESS: {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: "",
      };
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }

    default:
      return state;
  }
};

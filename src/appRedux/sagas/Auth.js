import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { SIGNIN_USER, SIGNOUT_USER } from "constants/ActionTypes";
import {
  setInitUrl,
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
} from "../../appRedux/actions/Auth";
import { doGetCities } from "./Common";
import { actionGetMenu, fetchStart } from "../actions";
import { reqAuth, reqAuthRegister, reqChangePassword } from "../services/auth";
import { message } from "antd";
import {
  CHANGE_PASSWORD,
  SIGNUP_USER,
} from "../../constants/ActionTypes";

const signOutRequest = async () => {
  return undefined;
};

function* singUpUSer({ payload }) {
  try {
    yield call(reqAuthRegister, payload);
    yield call(() => message.success("Đăng kí thành công!"));
    // window.location.replace("/login");
  } catch (e) {
    message.error(e.data.message);
  }
}
function* callChangePassword({ payload }) {
  try {
    yield call(reqChangePassword, payload);
    yield call(() => message.success("Thay đổi mật khẩu thành công"));
  } catch (e) {
    message.error("Mật khẩu cũ không đúng");
  }
}

function* signInUserWithEmailPassword({ payload }) {
  try {
    yield put(fetchStart);
    const response = yield call(reqAuth, payload);
    const { token, role, username, id, email } = response.data;
    localStorage.setItem("user_id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    localStorage.setItem("email", email);
    yield put(userSignInSuccess(response.data));
    yield put(actionGetMenu(role));
    yield doGetCities();
    window.location.replace("/");
  } catch (error) {
    message.error(error.data.message);
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      window.location.replace("/login");
      yield put(userSignOutSuccess());
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export function* doCheckToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      yield put(userSignOutSuccess());
      yield put(actionGetMenu(null));
      yield put(setInitUrl("/"));
    } else {
      yield put(actionGetMenu(localStorage.getItem("role")));
    }
    yield doGetCities();
  } catch (e) {
    yield put(userSignOutSuccess());
    yield put(showAuthMessage(e.message));
  }
}

// function* forgotPasswordWatcher() {
//   while (true) {
//     try {
//       const action = yield take(FORGOT_PASSWORD);
//       console.log(action.payload);
//     } catch (e) {
//       message.error(e.message);
//     }
//   }
// }

export default function* rootSaga() {
  yield all([
    takeEvery(SIGNIN_USER, signInUserWithEmailPassword),
    takeEvery(SIGNUP_USER, singUpUSer),
    yield takeLatest(CHANGE_PASSWORD, callChangePassword),
    fork(signOutUser),
    yield doCheckToken(),
    // yield forgotPasswordWatcher(),
  ]);
}

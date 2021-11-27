import { all, call, put, takeLatest } from "redux-saga/effects";
import { reqAdminPostGetAll } from "../services/admin";
import {
  POST_GET_LIST_SUCCESS_ADMIN,
  POST_GET_LIST_ADMIN,
  POST_CHANGE_STATE,
} from "../../constants/ActionTypes";
import { getPaginate } from "../../util/Helper";
import { message } from "antd";

export function* changeState(loading = false) {
  yield put({
    type: POST_CHANGE_STATE,
    payload: {
      listLoad: loading,
      actionLoad: loading,
    },
  });
}
export function* callPostGetListAdmin({ payload }) {
  try {
    yield call(changeState, true);
    const response = yield call(reqAdminPostGetAll, payload);
    console.log(getPaginate(response.data));
    yield put({
      type: POST_GET_LIST_SUCCESS_ADMIN,
      payload: {
        postListAdmin: response.data.posts,
        postPaginate: getPaginate(response.data),
      },
    });
  } catch (e) {
    message.error(e.message);
  } finally {
    yield call(changeState, false);
  }
}
export default function* rootSaga() {
  yield all([yield takeLatest(POST_GET_LIST_ADMIN, callPostGetListAdmin)]);
}

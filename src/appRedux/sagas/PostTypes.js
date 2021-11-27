import { all, call, put, takeLatest } from "redux-saga/effects";
import { reqPostCreate, reqPostGetList, reqPostUpdate } from "../services/post";
import {
  POST_TYPE_CHANGE_STATE,
  POST_TYPE_GET_LIST,
  POST_TYPE_GET_LIST_SUCCESS,
} from "../../constants/ActionTypes";
import { getPaginate } from "../../util/Helper";
import { message } from "antd";
import { reqPostTypeGetList } from "../services/postType";

function* changeState(loading = false) {
  yield put({
    type: POST_TYPE_CHANGE_STATE,
    payload: {
      listLoad: loading,
      actionLoad: loading,
    },
  });
}

export function* callPostTypeGetList({ payload }) {
  try {
    yield call(changeState, true);
    const response = yield call(reqPostTypeGetList, payload);
    yield put({
      type: POST_TYPE_GET_LIST_SUCCESS,
      payload: {
        postTypes: response.data.data,
      },
    });
  } catch (e) {
    message.error(e.message);
  } finally {
    yield call(changeState, false);
  }
}

export default function* rootSaga() {
  yield all([yield takeLatest(POST_TYPE_GET_LIST, callPostTypeGetList)]);
}

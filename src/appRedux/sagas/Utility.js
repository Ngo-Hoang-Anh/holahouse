import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  POST_CHANGE_STATE,
  UTILITY_GET_LIST,
  UTILITY_GET_LIST_SUCCESS,
} from "../../constants/ActionTypes";
import { message } from "antd";
import { reqUtilityGetList } from "../services/utility";

export function* changeState(loading = false) {
  yield put({
    type: POST_CHANGE_STATE,
    payload: {
      listLoad: loading,
      actionLoad: loading,
    },
  });
}

export function* callUtilityGetList({ payload }) {
  try {
    yield call(changeState, true);
    const response = yield call(reqUtilityGetList, payload);
    yield put({
      type: UTILITY_GET_LIST_SUCCESS,
      payload: {
        utilList: response.data.data,
        utilPaginate: {},
      },
    });
  } catch (e) {
    message.error(e.message);
  } finally {
    yield call(changeState, false);
  }
}

export default function* rootSaga() {
  yield all([yield takeLatest(UTILITY_GET_LIST, callUtilityGetList)]);
}

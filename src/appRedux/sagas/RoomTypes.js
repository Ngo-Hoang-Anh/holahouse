import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  ROOM_TYPE_CHANGE_STATE,
  ROOM_TYPE_GET_LIST,
  ROOM_TYPE_GET_LIST_SUCCESS,
} from "../../constants/ActionTypes";
import { message } from "antd";
import { reqRoomTypeGetList } from "../services/roomType";

function* changeState(loading = false) {
  yield put({
    type: ROOM_TYPE_CHANGE_STATE,
    payload: {
      listLoad: loading,
      actionLoad: loading,
    },
  });
}

export function* callRoomTypeGetList({ payload }) {
  try {
    yield call(changeState, true);
    const response = yield call(reqRoomTypeGetList, payload);
    yield put({
      type: ROOM_TYPE_GET_LIST_SUCCESS,
      payload: {
        roomTypes: response.data.data,
      },
    });
  } catch (e) {
    message.error(e.message);
  } finally {
    yield call(changeState, false);
  }
}

export default function* rootSaga() {
  yield all([yield takeLatest(ROOM_TYPE_GET_LIST, callRoomTypeGetList)]);
}

import {all, call, put, takeLatest} from "redux-saga/effects";
import {
  reqPostCreate,
  reqPostGetList,
  reqPostUpdate,
  reqPostGetAll,
  reqCostMinMax,
} from "../services/post";
import {
  POST_CHANGE_STATE,
  POST_CREATE,
  POST_GET_LIST,
  POST_GET_LIST_SUCCESS,
  POST_UPDATE,
  POST_GET_ALL_SUCCESS,
  POST_GET_ALL,
  POST_COST_MIN_MAX_SUCCESS,
  POST_COST_MIN_MAX,
} from "../../constants/ActionTypes";
import {getPaginate} from "../../util/Helper";
import {message} from "antd";

export function* changeState(loading = false) {
  yield put({
    type: POST_CHANGE_STATE,
    payload: {
      listLoad: loading,
      actionLoad: loading,
    },
  });
}

function* callPostCreate({payload}) {
  try {
    yield call(changeState, true);
    yield call(reqPostCreate, payload);
    yield call(() => {
      message.success("Tạo bài đăng thành công!");
      window.location.replace("/");
    });
  } catch (e) {
    message.error(e.message);
    return;
  } finally {
    yield call(changeState, false);
  }
}

function* callPostUpdate({payload}) {
  try {
    yield call(changeState, true);
    yield call(reqPostUpdate, payload);
    yield call(() => {
      message.success("Chỉnh sửa bài đăng thành công!");
      window.location.replace("/");
    });
  } catch (e) {
    message.error(e.message);
  } finally {
    yield call(changeState, false);
  }
}

export function* callPostGetList({payload}) {
  try {
    yield call(changeState, true);
    const response = yield call(reqPostGetList, payload);
    yield put({
      type: POST_GET_LIST_SUCCESS,
      payload: {
        postList: response.data.posts,
        postPaginate: getPaginate(response.data),
      },
    });
  } catch (e) {
    message.error(e.message);
  } finally {
    yield call(changeState, false);
  }
}

export function* callPostGetAll({payload}) {
  try {
    yield call(changeState, true);
    const response = yield call(reqPostGetAll, payload);
    yield put({
      type: POST_GET_ALL_SUCCESS,
      payload: {
        publicPostList: response.data.posts,
        postPaginate: getPaginate(response.data),
      },
    });
  } catch (e) {
    message.error(e.message);
  } finally {
    yield call(changeState, false);
  }
}

export function* callPostGetMinMax({payload}) {
  try {
    yield call(changeState, true);
    const response = yield call(reqCostMinMax, payload);
    yield put({
      type: POST_COST_MIN_MAX_SUCCESS,
      payload: {
        minCost: response.data.min,
        maxCost: response.data.max,
      },
    });
  } catch (e) {
    message.error(e.message);
  } finally {
    yield call(changeState, false);
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(POST_GET_ALL, callPostGetAll),
    yield takeLatest(POST_GET_LIST, callPostGetList),
    yield takeLatest(POST_CREATE, callPostCreate),
    yield takeLatest(POST_UPDATE, callPostUpdate),
    yield takeLatest(POST_COST_MIN_MAX, callPostGetMinMax),
  ]);
}

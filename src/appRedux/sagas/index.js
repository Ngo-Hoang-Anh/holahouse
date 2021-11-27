import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import notesSagas from "./Notes";
import commonSagas from "./Common";
import postSagas from "./Post";
import utilitySagas from "./Utility";
import postTypeSagas from "./PostTypes";
import roomTypeSagas from "./RoomTypes";
import adminSagas from "./Admin";
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    notesSagas(),
    commonSagas(),
    postSagas(),
    utilitySagas(),
    postTypeSagas(),
    roomTypeSagas(),
    adminSagas(),
  ]);
}

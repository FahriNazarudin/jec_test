import { all, fork } from "redux-saga/effects";
import appointmentSaga from "./appointmentSaga";

// Root saga that combines all sagas
export default function* rootSaga() {
  yield all([
    fork(appointmentSaga),
    // Add other sagas here as needed
  ]);
}

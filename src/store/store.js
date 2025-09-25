import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appointmentSlice from "./slices/appointmentSlice";
import rootSaga from "./sagas/rootSaga";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store
const store = configureStore({
  reducer: {
    appointments: appointmentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk since we're using saga
      serializableCheck: {
        ignoredActions: [], // Add any non-serializable actions here if needed
      },
    }).concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(rootSaga);

export default store;

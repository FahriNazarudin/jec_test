import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchAppointmentsStart,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  addAppointmentStart,
  addAppointmentSuccess,
  addAppointmentFailure,
  updateAppointmentStart,
  updateAppointmentSuccess,
  updateAppointmentFailure,
  deleteAppointmentStart,
  deleteAppointmentSuccess,
  deleteAppointmentFailure,
} from "../slices/appointmentSlice";

// Mock API calls (replace with actual API endpoints)
const appointmentAPI = {
  fetchAppointments: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, return mock data from dummy.json structure
    return [
      {
        id: 1,
        patientName: "Fahrin Zaidan",
        doctorName: "Dr. Sarah Johnson",
        appointmentDate: "2024-01-15",
        appointmentTime: "10:00",
        status: "scheduled",
        specialty: "Cardiologist",
        phone: "+62 812-3456-7890",
        email: "fahrin@example.com",
      },
      {
        id: 2,
        patientName: "John Doe",
        doctorName: "Dr. Michael Brown",
        appointmentDate: "2024-01-16",
        appointmentTime: "14:30",
        status: "completed",
        specialty: "Dermatologist",
        phone: "+62 813-9876-5432",
        email: "john@example.com",
      },
      {
        id: 3,
        patientName: "Jane Smith",
        doctorName: "Dr. Emily Davis",
        appointmentDate: "2024-01-17",
        appointmentTime: "09:15",
        status: "cancelled",
        specialty: "Neurologist",
        phone: "+62 814-5555-1234",
        email: "jane@example.com",
      },
    ];
  },

  addAppointment: async (appointmentData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return new appointment with generated ID
    return {
      id: Date.now(),
      ...appointmentData,
      status: "scheduled",
    };
  },

  updateAppointment: async (id, appointmentData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      id,
      ...appointmentData,
    };
  },

  deleteAppointment: async (id) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { success: true, id };
  },
};

// Worker Sagas
function* fetchAppointmentsSaga() {
  try {
    const appointments = yield call(appointmentAPI.fetchAppointments);
    yield put(fetchAppointmentsSuccess(appointments));
  } catch (error) {
    yield put(
      fetchAppointmentsFailure(error.message || "Failed to fetch appointments")
    );
  }
}

function* addAppointmentSaga(action) {
  try {
    const newAppointment = yield call(
      appointmentAPI.addAppointment,
      action.payload
    );
    yield put(addAppointmentSuccess(newAppointment));
  } catch (error) {
    yield put(
      addAppointmentFailure(error.message || "Failed to add appointment")
    );
  }
}

function* updateAppointmentSaga(action) {
  try {
    const { id, appointmentData } = action.payload;
    const updatedAppointment = yield call(
      appointmentAPI.updateAppointment,
      id,
      appointmentData
    );
    yield put(updateAppointmentSuccess(updatedAppointment));
  } catch (error) {
    yield put(
      updateAppointmentFailure(error.message || "Failed to update appointment")
    );
  }
}

function* deleteAppointmentSaga(action) {
  try {
    yield call(appointmentAPI.deleteAppointment, action.payload);
    yield put(deleteAppointmentSuccess(action.payload));
  } catch (error) {
    yield put(
      deleteAppointmentFailure(error.message || "Failed to delete appointment")
    );
  }
}

// Watcher Sagas
function* watchFetchAppointments() {
  yield takeEvery(fetchAppointmentsStart.type, fetchAppointmentsSaga);
}

function* watchAddAppointment() {
  yield takeEvery(addAppointmentStart.type, addAppointmentSaga);
}

function* watchUpdateAppointment() {
  yield takeEvery(updateAppointmentStart.type, updateAppointmentSaga);
}

function* watchDeleteAppointment() {
  yield takeEvery(deleteAppointmentStart.type, deleteAppointmentSaga);
}

// Root Saga
export default function* appointmentSaga() {
  yield [
    watchFetchAppointments(),
    watchAddAppointment(),
    watchUpdateAppointment(),
    watchDeleteAppointment(),
  ];
}

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
  loading: false,
  error: null,
  selectedAppointment: null,
  filters: {
    date: "",
    serviceUnit: "",
    doctor: "",
    searchTerm: "",
  },
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    // Fetch appointments actions
    fetchAppointmentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
      state.error = null;
    },
    fetchAppointmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create appointment actions
    createAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointments.push(action.payload);
      state.error = null;
    },
    createAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update appointment actions
    updateAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAppointmentSuccess: (state, action) => {
      state.loading = false;
      const index = state.appointments.findIndex(
        (app) => app.registNum === action.payload.registNum
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
      state.error = null;
    },
    updateAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete appointment actions
    deleteAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointments = state.appointments.filter(
        (app) => app.registNum !== action.payload
      );
      state.error = null;
    },
    deleteAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Filter and search actions
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Select appointment
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  createAppointmentRequest,
  createAppointmentSuccess,
  createAppointmentFailure,
  updateAppointmentRequest,
  updateAppointmentSuccess,
  updateAppointmentFailure,
  deleteAppointmentRequest,
  deleteAppointmentSuccess,
  deleteAppointmentFailure,
  setFilters,
  clearFilters,
  setSelectedAppointment,
  clearError,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

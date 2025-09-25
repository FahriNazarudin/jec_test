import { createSelector } from "@reduxjs/toolkit";

// Base selector
const selectAppointmentsState = (state) => state.appointments;

// Basic selectors
export const selectAllAppointments = createSelector(
  [selectAppointmentsState],
  (appointmentsState) => appointmentsState.appointments
);

export const selectAppointmentsLoading = createSelector(
  [selectAppointmentsState],
  (appointmentsState) => appointmentsState.loading
);

export const selectAppointmentsError = createSelector(
  [selectAppointmentsState],
  (appointmentsState) => appointmentsState.error
);

export const selectCurrentFilter = createSelector(
  [selectAppointmentsState],
  (appointmentsState) => appointmentsState.filter
);

// Memoized filtered appointments selector
export const selectFilteredAppointments = createSelector(
  [selectAllAppointments, selectCurrentFilter],
  (appointments, filter) => {
    if (filter === "all") {
      return appointments;
    }
    return appointments.filter((appointment) => appointment.status === filter);
  }
);

// Selector for appointments by status
export const selectAppointmentsByStatus = createSelector(
  [selectAllAppointments],
  (appointments) => {
    return {
      scheduled: appointments.filter((apt) => apt.status === "scheduled"),
      completed: appointments.filter((apt) => apt.status === "completed"),
      cancelled: appointments.filter((apt) => apt.status === "cancelled"),
    };
  }
);

// Selector for appointment statistics
export const selectAppointmentStats = createSelector(
  [selectAllAppointments],
  (appointments) => {
    const total = appointments.length;
    const scheduled = appointments.filter(
      (apt) => apt.status === "scheduled"
    ).length;
    const completed = appointments.filter(
      (apt) => apt.status === "completed"
    ).length;
    const cancelled = appointments.filter(
      (apt) => apt.status === "cancelled"
    ).length;

    return {
      total,
      scheduled,
      completed,
      cancelled,
      scheduledPercentage:
        total > 0 ? ((scheduled / total) * 100).toFixed(1) : 0,
      completedPercentage:
        total > 0 ? ((completed / total) * 100).toFixed(1) : 0,
      cancelledPercentage:
        total > 0 ? ((cancelled / total) * 100).toFixed(1) : 0,
    };
  }
);

// Selector for appointments by date
export const selectAppointmentsByDate = createSelector(
  [selectAllAppointments],
  (appointments) => {
    const appointmentsByDate = {};

    appointments.forEach((appointment) => {
      const date = appointment.appointmentDate;
      if (!appointmentsByDate[date]) {
        appointmentsByDate[date] = [];
      }
      appointmentsByDate[date].push(appointment);
    });

    return appointmentsByDate;
  }
);

// Selector for upcoming appointments (scheduled appointments sorted by date)
export const selectUpcomingAppointments = createSelector(
  [selectAllAppointments],
  (appointments) => {
    const today = new Date().toISOString().split("T")[0];

    return appointments
      .filter(
        (appointment) =>
          appointment.status === "scheduled" &&
          appointment.appointmentDate >= today
      )
      .sort((a, b) => {
        const dateA = new Date(`${a.appointmentDate} ${a.appointmentTime}`);
        const dateB = new Date(`${b.appointmentDate} ${b.appointmentTime}`);
        return dateA - dateB;
      });
  }
);

// Selector to find appointment by ID
export const selectAppointmentById = (appointmentId) =>
  createSelector([selectAllAppointments], (appointments) =>
    appointments.find((appointment) => appointment.id === appointmentId)
  );

// Selector for doctors list (unique)
export const selectDoctorsList = createSelector(
  [selectAllAppointments],
  (appointments) => {
    const doctors = [...new Set(appointments.map((apt) => apt.doctorName))];
    return doctors.sort();
  }
);

// Selector for specialties list (unique)
export const selectSpecialtiesList = createSelector(
  [selectAllAppointments],
  (appointments) => {
    const specialties = [...new Set(appointments.map((apt) => apt.specialty))];
    return specialties.sort();
  }
);

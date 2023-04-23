import { createSlice } from "@reduxjs/toolkit";

const storedPatientLogin = localStorage.getItem('patientLogin');
const initialPatientLogin = storedPatientLogin ? JSON.parse(storedPatientLogin) : false;

const storedPatientId = localStorage.getItem('patientId');
const initialPatientId = storedPatientId ? JSON.parse(storedPatientId) : null;


const PatientSlice = createSlice({
  name: "patient",
  initialState: {
    patientLogin: initialPatientLogin,
    patientId:initialPatientId
  },
  reducers: {
    setpatientLogin: (state, action) => {
      state.patientLogin = action.payload
    },
    setPatientId: (state, action) => {
      state.patientId = action.payload;
    }
  }
});

export const { setpatientLogin, setPatientId } = PatientSlice.actions;
export default PatientSlice.reducer;

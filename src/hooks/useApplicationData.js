import { useState, useEffect } from "react";
import axios from "axios";
import { getSpotsForDay } from "helpers/selectors";
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  useEffect(() => {
    const getDays = axios.get(`/api/days`)
    const getAppointments = axios.get('/api/appointments')
    const getInterviewers = axios.get('/api/interviewers')

    Promise.all([
      getDays, 
      getAppointments, 
      getInterviewers])
    .then(response => {
      setState(state => (
        {...state, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
    })
  }, [])

const setDay = day => setState({...state, day});

const bookInterview = function(id, interview) {

  // Checks if interview is new or existing
  // if exisitng set isInterviewNew to false;
  let isInterviewNew = true;
  state.appointments[id]['interview'] ? isInterviewNew = false : isInterviewNew = true;

  const appointment = { 
    ...state.appointments[id],
    interview: { ...interview }
  };
  
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const days = [
    ...state.days
  ];

  // if interview is new decrease spots remaining if exisitng leave spots the same
  if (isInterviewNew) {
  let newSpots = getSpotsForDay(state, state.day, true)
  let updatedSpots = newSpots.spots;
  let dayIndex = newSpots.index;
  days[dayIndex]["spots"] = updatedSpots;
  }
  // updates database with new appointment
  return axios.put(`/api/appointments/${id}`, appointment)
  .then(() => {
      setState({...state, appointments, days})
    })
}

// deletes interview from database leaving empty slot
const cancelInterview = function(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  // if interview is cancelled increase spots remaining by 1
  let newSpots = getSpotsForDay(state, state.day, false)
  let updatedSpots = newSpots.spots;
  let dayIndex = newSpots.index;
  const days = [
    ...state.days
  ]
  days[dayIndex]["spots"] = updatedSpots;

  return axios.delete(`/api/appointments/${id}`)
    .then(() => setState({...state, appointments}))
}

return {state, setDay, bookInterview, cancelInterview}

}
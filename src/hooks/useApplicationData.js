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
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  let newSpots = getSpotsForDay(state, state.day, true)
  let updatedSpots = newSpots.spots;
  let dayIndex = newSpots.index;
  const days = [
    ...state.days
  ]
  days[dayIndex]["spots"] = updatedSpots;

 return axios.put(`/api/appointments/${id}`, appointment)
 .then(() => {
      setState({...state, appointments, days})
    })
}

const cancelInterview = function(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

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
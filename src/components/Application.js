import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";

import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

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

    console.log(state)

    const dailyAppointments = getAppointmentsForDay(state, state.day);

    const apptData = dailyAppointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
      <Appointment
      key={appointment.id} 
      {...appointment}
      interview={interview}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {apptData}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

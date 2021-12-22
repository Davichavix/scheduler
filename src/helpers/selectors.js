const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

export function getAppointmentsForDay(state, day) {
  let res = [];
  const stateDays = state["days"];
  const stateAppts = state["appointments"];

  const getAppointmentIdForDay = function(stateDays, day) {
    for (const days of stateDays) {
        if (days["name"] === day) {
          return days["appointments"];
        }
      }
      return [];
    }

  const appointmentId = getAppointmentIdForDay(stateDays, day)
  
  for (const appts of appointmentId) {
    if (stateAppts[appts]) {
      res.push(stateAppts[appts])
    } 
  }
  return res;
}

export function getInterview(state, interview) {
  let interviewerObj = state["interviewers"];
  if (!interview) {
        return null
  };

  for (const interviewerID in interviewerObj ) {
    if(interviewerObj[interviewerID]["id"] === interview["interviewer"]) {
      interview["interviewer"] = interviewerObj[interviewerID];
    }
  }
  return interview;
}
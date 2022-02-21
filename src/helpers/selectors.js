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

export function getInterviewersForDay(state, day) {
  let res = [];
  const stateDays = state["days"];
  const stateInterviewers = state["interviewers"];

  const getInterviewersIdForDay = function(stateDays, day) {
    for (const days of stateDays) {
        if (days["name"] === day) {
          return days["interviewers"];
        }
      }
      return [];
    }

  const InterviewersId = getInterviewersIdForDay(stateDays, day)
  for (const interviewer of InterviewersId) {
    if (stateInterviewers[interviewer]) {
      res.push(stateInterviewers[interviewer])
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

// helper function used to update spots remaining if new interview is added or existing interview cancelled
export function getSpotsForDay(state, day, add) {

  const dayObj = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4
  };

  let stateSpots = state["days"][dayObj[day]]["spots"]
  let res = {};
  if (add) {
    stateSpots = stateSpots - 1;
  } else {
    stateSpots = stateSpots + 1;
  }
  res["spots"] = stateSpots;
  res["index"] = dayObj[day];
  return res;
}

export function getSpotForDay(state) {

}
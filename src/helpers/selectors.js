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
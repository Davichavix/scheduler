import React from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

 const { mode, transition, back } = useVisualMode(
   props.interview ? SHOW: EMPTY
 );

 function save(name, interviewer) {
   if (name && interviewer) {
   const interview = {
     student: name,
     interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true))
  }
}

function deleteInterviewConfirm() {
  transition(CONFIRM)
}

function destroy(event) {
  transition(DELETE, true);
  props
   .cancelInterview(props.id)
   .then(() => transition(EMPTY))
   .catch(error => transition(ERROR_DELETE, true));
 }

function editInterview() {
  transition(EDIT)
}

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === DELETE && <Status message={'Deleting'}/>}
      {mode === ERROR_SAVE && <Error
        message={'Could not save appointment'}
        onClose={back}
      />}
      {mode === ERROR_DELETE && <Error
        message={'Could not delete appointment'}
        onClose={back}
      />}
      {mode === CONFIRM && <Confirm
        message='Delete the appointment?'
        onCancel={back}
        onConfirm={destroy}
      />}
      {mode === CREATE && <Form 
        interviewer={props.interviewer}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />}
      {mode === EDIT && <Form 
        student={props.interview.student}
        interviewer={props.interviewer}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />}
      {mode === SHOW && <Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer}
        onEdit={editInterview}
        onDelete={deleteInterviewConfirm}
      />}  
    </article>
  );
}
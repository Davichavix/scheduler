import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

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
  }
}

function deleteInterviewConfirm() {
  transition(CONFIRM)
}

function deleteInterview() {
  transition(DELETE)
  props.cancelInterview(props.id)
  .then(() => transition(EMPTY))
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
      {mode === CONFIRM && <Confirm
        message='Delete the appointment?'
        onCancel={back}
        onConfirm={deleteInterview}
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
import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewerName = props.interviewers.map((interviewers) => {
    return <InterviewerListItem
            key={interviewers.id}
            id={interviewers.id}
            avatar={interviewers.avatar}
            name={interviewers.name}
            selected={interviewers.id === props.interviewer}
            setInterviewer={props.setInterviewer}
          />
  })

  return ( 
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerName}
      </ul>
    </section>
  )
}
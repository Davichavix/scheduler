import React from "react";

import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  const interviewName = classNames("interviewers__item",{
    "interviewers__item--selected" : props.selected
  })

  return (
    <li 
    onClick={props.setInterviewer}
    className={interviewName}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        />
        {props.selected && props.name}
  </li>
  );
}
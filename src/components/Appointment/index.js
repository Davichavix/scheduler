import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      {!props.time && "No Appointment"}
      {props.time && `Appointment at ${props.time}`}
    </article>
  );
}
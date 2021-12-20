import React from "react";

import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const intDays = props.days.map((days)=> {
    return ( <DayListItem
            key={days.id}
            name={days.name}
            spots={days.spots}
            selected={days.name === props.day}
            setDay={props.setDay}
          />
    )
  })

  return (
    <ul>
      {intDays}
    </ul>
  )
}
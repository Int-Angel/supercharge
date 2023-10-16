import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import {EventInteractionArgs} from 'react-big-calendar/lib/addons/dragAndDrop.js'

import moment from 'moment'
import "./style.scss";
import 'react-big-calendar/lib/css/react-big-calendar.css'

const DnDCalendar = withDragAndDrop(Calendar)

const localizer = momentLocalizer(moment)

function onEventDrop({event, start, end, isAllDay}: EventInteractionArgs<Event>) {console.log("Hello")}
function onEventResize({event, start, end, isAllDay}: EventInteractionArgs<Event>) {console.log("Hello")}
function onDragStart({event}: any) {console.log("Hello")}

export default function CalendarMod() {
  return (
    <div style={{justifyContent: 'center', margin: 'auto'}}>
      <DnDCalendar
        localizer={localizer}
        draggableAccessor={(event) => true}
        style={{ height: '700px', width: '1000px'}}
      />
    </div>
  );
}

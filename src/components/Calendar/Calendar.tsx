import React, {useState, useMemo, useCallback} from "react";
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import {EventInteractionArgs} from 'react-big-calendar/lib/addons/dragAndDrop.js'
import events from './events.js'

import moment from 'moment'
import "./style.scss";
import 'react-big-calendar/lib/css/react-big-calendar.css'

const DnDCalendar = withDragAndDrop(Calendar)

const localizer = momentLocalizer(moment)

function onEventDrop({event, start, end, isAllDay}: EventInteractionArgs<Event>) {console.log("Hello")}
function onEventResize({event, start, end, isAllDay}: EventInteractionArgs<Event>) {console.log("Hello")}
function onDragStart({event}: any) {console.log("Hello")}

interface Item {
  name: string;
  val: number;
}

export default function CalendarMod() {

  const adjEvents = events.map((it, ind) => ({
    ...it,
    isDraggable: ind % 2 === 0,
  }))

  const [draggedEvent, setDraggedEvent] = useState<any | null>()
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)
  const [myEvents, setMyEvents] = useState(adjEvents)

  console.log(myEvents)
  const defaultDate = useMemo(() => new Date(2015, 3, 12), [])

  const eventPropGetter = useCallback(
    (event: any) => ({
      ...(event.isDraggable
        ? { className: 'isDraggable' }
        : { className: 'nonDraggable' }),
    }),
    []
  )

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

  const handleDragStart = useCallback((event: any) => setDraggedEvent(event), [])

  const customOnDragOver = useCallback(
    (dragEvent: any) => {
      // check for undroppable is specific to this example
      // and not part of API. This just demonstrates that
      // onDragOver can optionally be passed to conditionally
      // allow draggable items to be dropped on cal, based on
      // whether event.preventDefault is called
      if (draggedEvent !== 'undroppable') {
        console.log('preventDefault')
        dragEvent.preventDefault()
      }
    },
    [draggedEvent]
  )

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }: any) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }

      setMyEvents((prev: any) => {
        const existing = prev.find((ev: any) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev: any) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay }]
      })
    },
    [setMyEvents]
  )

  const newEvent = useCallback(
    (event: any) => {
      setMyEvents((prev) => {
        const idList = prev.map((item) => item.id)
        const newId = Math.max(...idList) + 1
        return [...prev, { ...event, id: newId }]
      })
    },
    [setMyEvents]
  )

  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }: any) => {
      if (draggedEvent === 'undroppable') {
        setDraggedEvent(null)
        return
      }

      const { title } = draggedEvent
      const event = {
        title,
        start,
        end,
        isAllDay,
      }
      setDraggedEvent(null)
      newEvent(event)
    },
    [draggedEvent, setDraggedEvent, newEvent]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }: any) => {
      setMyEvents((prev: any) => {
        const existing = prev.find((ev: any) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev: any) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setMyEvents]
  )

  const items = [
    {
      name: "Arrastrame hacia el calendario",
      val: 0
    },
    {
      name: "Arrastrame hacia el calendario 2",
      val: 0
    }
  ]

  return (
    <div style={{justifyContent: 'center', margin: 'auto'}}>
      <div>
        {Object.entries(items).map(([name, val]) => (
          <div
            draggable="true"
            key={name}
            onDragStart={() =>
              handleDragStart({ title: val.name })
            }
          >
            {val.name}
          </div>
        ))}
      </div>
      <DnDCalendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        localizer={localizer}
        events={myEvents}
        style={{ height: '700px', width: '1000px'}}

        eventPropGetter={eventPropGetter}
        onDragOver={customOnDragOver}
        onEventDrop={moveEvent}
        onSelectSlot={newEvent}
        onDropFromOutside={onDropFromOutside}
        onEventResize={resizeEvent}
        //draggableAccessor="isDraggable"
        selectable
        resizable
      />
    </div>
  );
}


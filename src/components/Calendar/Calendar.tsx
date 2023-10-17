import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import moment from "moment";
import "./style.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGetTodoListsFromUserWithTodos } from "../../hooks/todo/useGetTodoListsFromUserWithTodos";
import { useAuth } from "../../contexts/AuthProvider";
import { useUpdateTodo } from "../../hooks/todo/useUpdateTodo";
import { useDraggedEvent } from "../../DraggedEventprovider.js";

const DnDCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);

type TTodo = {
  id: string;
  description: string;
  list_position: number;
  completed: boolean;
  priority: number;
  start_time: Date;
  end_time: Date;
};

type TCalendarEvent = {
  isDraggable: boolean;
  id: string;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  desc?: undefined;
};

export default function CalendarMod() {
  const draggedEvent = useDraggedEvent();

  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [myEvents, setMyEvents] = useState<Array<TCalendarEvent>>([]);
  const { id } = useAuth();
  const [todosCalendar, setTodosCalendar] = useState<Array<TCalendarEvent>>();
  const mutation = useUpdateTodo();

  useEffect(() => {
    if (draggedEvent) {
      console.log("Dragged Event:", draggedEvent);
    }
  }, [draggedEvent]);
  
  
  const {
    data: todoLists,
    isError,
    isLoading,
    refetch,
  } = useGetTodoListsFromUserWithTodos(id);

  useEffect(() => {
    if (Array.isArray(todoLists)) {
      const todosCalendar: Array<TCalendarEvent> = [];
      todoLists.forEach(todoList => {
        if (Array.isArray(todoList.todo)) {
          todoList.todo.forEach((todo: TTodo) => {
            if (todo.start_time != null) {
              const todoCalendar = {
                isDraggable: true,
                id: todo.id,
                title: todo.description,
                allDay: false,
                start: new Date(todo.start_time),
                end: new Date(todo.end_time),
              };
              todosCalendar.push(todoCalendar);
            }
          });
        }
        setTodosCalendar(todosCalendar)
      });
    }
  }, [todoLists, setTodosCalendar]);

  const defaultDate = useMemo(() => new Date(), []);

  /*
  const eventPropGetter = useCallback(
    (event: any) => ({
      ...(event.isDraggable
        ? { className: "isDraggable" }
        : { className: "nonDraggable" }),
    }),
    [],
  );
  */

  const eventPropGetter = () => {
    var backgroundColor = "#039BE5";
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "8px",
      opacity: 1,
      color: "white",
      border: "1px solid #039BE5",
      borderLeft: "3px solid #004F75",
    };
    return {
      style: style,
    };
  };

  // const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent]);

  // const handleDragStart = useCallback(
  //   (event: any) => draggedEvent(event),
  //   [draggedEvent],
  // );

  // const customOnDragOver = useCallback(
  //   (dragEvent: any) => {
  //     // check for undroppable is specific to this example
  //     // and not part of API. This just demonstrates that
  //     // onDragOver can optionally be passed to conditionally
  //     // allow draggable items to be dropped on cal, based on
  //     // whether event.preventDefault is called
  //     if (draggedEvent !== "undroppable") {
  //       console.log("preventDefault");
  //       dragEvent.preventDefault();
  //     }
  //   },
  //   [draggedEvent],
  // );

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }: any) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev: any) => {
        const existing = prev.find((ev: any) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev: any) => ev.id !== event.id);
        const val = [...filtered, { ...existing, start, end }]
        const l = val.length

        const startWithOffset = new Date(val[l-1].start.getTime() - (val[l-1].start.getTimezoneOffset() * 60000)).toISOString();
        const endWithOffset = new Date(val[l-1].end.getTime() - (val[l-1].end.getTimezoneOffset() * 60000)).toISOString();

        mutation.mutate({
          todo_id: event.id,
          start_time:startWithOffset,
          end_time: endWithOffset,
        });
        return val
      });
    },
    [setMyEvents, mutation],
  );

  const newEvent = useCallback(
    (event: any) => {
      setMyEvents((prev) => {
        const idList = prev.map((item) => item.id);
        //const newId = Math.max(...idList) + 1
        return [...prev, { ...event, id: "newId" }];
      });
    },
    [setMyEvents],
  );
  
  const onDropFromOutside = useCallback(
    ({ start, end }: any) => {
      const {id} = draggedEvent.draggedEvent;

      const startWithOffset = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
      const endWithOffset = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();

      mutation.mutate({
        todo_id: id,
        start_time:startWithOffset,
        end_time: endWithOffset,
      });
      draggedEvent.setDraggedEvent(null);
    },
    [draggedEvent, mutation],
  );

  const resizeEvent = useCallback(
    ({ event, start, end }: any) => {
      setMyEvents((prev: any) => {
        const existing = prev.find((ev: any) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev: any) => ev.id !== event.id)
        const val = [...filtered, { ...existing, start, end }]
        const l = val.length

        const startWithOffset = new Date(val[l-1].start.getTime() - (val[l-1].start.getTimezoneOffset() * 60000)).toISOString();
        const endWithOffset = new Date(val[l-1].end.getTime() - (val[l-1].end.getTimezoneOffset() * 60000)).toISOString();

        mutation.mutate({
          todo_id: event.id,
          start_time:startWithOffset,
          end_time: endWithOffset,
        });
        return val
      })
    },
    [setMyEvents, mutation]
  );

  return (
    <div
      style={{
        justifyContent: "center",
        margin: "auto",
        width: "80%",
        height: "100%",
      }}
    >
      <DnDCalendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        localizer={localizer}
        events={todosCalendar}
        style={{ height: "100%", width: "100%" }}
        eventPropGetter={eventPropGetter}
        //onDragOver={customOnDragOver}
        onEventDrop={moveEvent}
        onSelectSlot={newEvent}
        onDropFromOutside={onDropFromOutside}
        onEventResize={resizeEvent}
        //draggableAccessor="isDraggable"
        resizable
      />
    </div>
  );
}

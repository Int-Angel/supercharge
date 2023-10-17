import React, { useEffect, useState } from "react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import ModalContainer from "../ModalContainer/ModalContainer";
import Todo from "../Todo/Todo";
import { X, Check, Flag } from "react-feather";
import { format } from "date-fns";
import { useMarkTodoAsCompleted } from "../../hooks/todo/useMarkTodoAsCompleted";
import DropDownButton from "../DropDownButton/DropDownButton";
import PriorityMenu from "../PriorityMenu/PriorityMenu";
import { useUpdateTodo } from "../../hooks/todo/useUpdateTodo";

import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import "./style.scss";

interface Props {
  open: boolean;
  onClose: () => any;
  onConfirm: (description: string) => any;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TodoDetailsModal({
  open,
  onClose,
  onConfirm,
  id,
  description,
  completed,
  priority: initialPriority,
  start_time: initial_start_time,
  end_time: initial_end_time,
}: Props & React.ComponentProps<typeof Todo>) {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showPriority, setShowPriority] = React.useState(false);
  const [priority, setPriority] = React.useState(initialPriority || 0);

  const [datesRange, setDatesRange] = useState<Value>([null, null]);

  const markTodoAsCompleted = useMarkTodoAsCompleted();
  const updateTodoMutation = useUpdateTodo();

  const handleMarkTodoAsCompleted = (todo_id: string) => {
    markTodoAsCompleted.mutate({ todo_id: todo_id });
  };

  const handleUpdateTodo = (newPriority: number) => {
    updateTodoMutation.mutate({
      todo_id: id,
      description: description,
      priority: newPriority,
      completed: completed,
    });
  };

  const togglePriority = () => {
    setShowPriority(!showPriority);
  };

  useEffect(() => {
    if (initial_start_time === "" || initial_end_time === "") return;
    if (initial_start_time && initial_end_time) {
      setDatesRange([new Date(initial_start_time), new Date(initial_end_time)]);
    }
  }, [initial_start_time, initial_end_time]);

  useEffect(() => {
    if (datesRange === null) {
      updateTodoMutation.mutate({
        todo_id: id,
        start_time: null,
        end_time: null,
      });
      return;
    }
    if (!Array.isArray(datesRange)) return;
    const start_time =
      datesRange[0] === null
        ? ""
        : format(datesRange[0], "yyyy-MM-dd HH:mm:ss");
    const end_time =
      datesRange[1] === null
        ? ""
        : format(datesRange[1], "yyyy-MM-dd HH:mm:ss");

    updateTodoMutation.mutate({
      todo_id: id,
      start_time: start_time,
      end_time: end_time,
    });
  }, [datesRange]);

  return (
    <ModalContainer open={open} onClose={onClose}>
      <div className="TodoDetailsModalContainer">
        <div className="TodoDetailsModalContainer--Left">
          <div
            className={`roundedCheckboxToDoContainer2`}
            onMouseEnter={() => {
              setShowCheckmark(true);
            }}
            onMouseLeave={() => {
              setShowCheckmark(false);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              type="checkbox"
              className={`roundedCheckboxToDo2 priority2-${priority}`}
              checked={completed}
              onChange={() => handleMarkTodoAsCompleted(id)}
            />
            {showCheckmark && !completed && (
              <span className="checkmark2">
                <Check
                  strokeWidth={2}
                  size={24}
                  color={priorityColorMap.get(priority)}
                />
              </span>
            )}
            {completed && (
              <>
                <span className="checkmark2">
                  <Check strokeWidth={2} size={24} color={"#FFFFFF"} />
                </span>
              </>
            )}
          </div>
          <div className="TodoDescription2">{description}</div>
        </div>
        <div className="TodoDetailsModalContainer--Right">
          <div className="TodoDetailsModalContainer--Right--Item">
            <div className="TodoDetailsModalContainer--Right--Item--Title">
              Time
            </div>
            <DateTimeRangePicker onChange={setDatesRange} value={datesRange} />
          </div>

          <div className="TodoDetailsModalContainer--Right--Item">
            <div className="TodoDetailsModalContainer--Right--Item--Title">
              Priority
            </div>
            <DropDownButton
              text={priority === -1 ? "Add priority" : `Priority ${priority}`}
              icon={Flag}
              iconColor={priorityFlagColorMap.get(priority)}
              onClick={(e: any) => {
                e.stopPropagation();
                togglePriority();
              }}
              initialSelection={priority}
              onClear={() => {
                setPriority(0);
                handleUpdateTodo(0);
              }}
            />
          </div>
        </div>
        <X
          className="TodoDetailsModalContainer--Close"
          onClick={onClose}
          size={24}
          color="#6A6A6A"
        />
      </div>
      {showPriority && (
        <div className="Details_Priority">
          <PriorityMenu
            selectedPriority={priority}
            onClick={(p) => {
              setPriority(p);
              handleUpdateTodo(p);
              setShowPriority(false);
            }}
            onCloseMenu={() => setShowPriority(false)}
          />
        </div>
      )}
    </ModalContainer>
  );
}

const priorityFlagColorMap = new Map<number, string>([
  [-1, "#2F2F2F"],
  [0, "#2F2F2F"],
  [1, "#5d7bff"],
  [2, "#fccf5c"],
  [3, "#ff1010"],
]);

const priorityColorMap = new Map<number, string>([
  [0, "#C9C9C9"],
  [1, "#4766f3"],
  [2, "#e1b850"],
  [3, "#ff1010"],
]);

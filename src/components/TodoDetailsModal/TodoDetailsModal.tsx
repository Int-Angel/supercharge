import React, { useEffect, useState } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import Todo from "../Todo/Todo";
import "./style.scss";
import { X, Check, Flag, Calendar } from "react-feather";
import { useMarkTodoAsCompleted } from "../../hooks/todo/useMarkTodoAsCompleted";
import DropDownButton from "../DropDownButton/DropDownButton";
import { format } from "date-fns";
import PriorityMenu from "../PriorityMenu/PriorityMenu";
import { useUpdateTodo } from "../../hooks/todo/useUpdateTodo";

interface Props {
  open: boolean;
  onClose: () => any;
  onConfirm: (description: string) => any;
}

export default function TodoDetailsModal({
  open,
  onClose,
  onConfirm,
  id,
  description,
  completed,
  priority: initialPriority,
  start_time,
  end_time,
}: Props & React.ComponentProps<typeof Todo>) {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showPriority, setShowPriority] = React.useState(false);
  const [priority, setPriority] = React.useState(initialPriority || 0);

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
      start_time: start_time,
      end_time: end_time,
      completed: completed,
    });
  };

  const togglePriority = () => {
    setShowPriority(!showPriority);
  };

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
              Start Time
            </div>
            <DropDownButton
              text={"add start time"}
              icon={Calendar}
              onClick={() => {}}
              initialSelection={-1}
              onClear={() => {}}
              iconColor={"#2F2F2F"}
            />
          </div>

          <div className="TodoDetailsModalContainer--Right--Item">
            <div className="TodoDetailsModalContainer--Right--Item--Title">
              End Time
            </div>
            <DropDownButton
              text={"add end time"}
              icon={Calendar}
              onClick={() => {}}
              initialSelection={-1}
              onClear={() => {}}
              iconColor={"#2F2F2F"}
            />
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

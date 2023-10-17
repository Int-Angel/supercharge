import { useState } from "react";
import "./style.scss";

import { Check } from "react-feather";
import TodoDetailsModal from "../TodoDetailsModal/TodoDetailsModal";

interface Props {
  id: string;
  description: string;
  completed: boolean;
  priority: number;
  start_time?: string;
  end_time?: string;
}

export default function Todo({
  id,
  description,
  completed,
  priority,
  start_time,
  end_time,
}: Props) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  return (
    <div className="TodoContainer" onClick={() => setShowDetailsModal(true)}>
      <div
        className={`roundedCheckboxToDoContainer`}
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
          className={`roundedCheckboxToDo priority-${priority}`}
          checked={completed}
          onChange={(val) => {
            console.log("clicked: ", val);
          }}
        />
        {showCheckmark && !completed && (
          <span className="checkmark">
            <Check
              strokeWidth={2}
              size={14}
              color={priorityColorMap.get(priority)}
            />
          </span>
        )}
        {completed && (
          <>
            <span className="checkmark">
              <Check strokeWidth={2} size={14} color={"#FFFFFF"} />
            </span>
          </>
        )}
      </div>
      <div className={`TodoDescription ${completed ? "todoCompleted" : ""}`}>
        {description}
      </div>
      <TodoDetailsModal
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onConfirm={() => {}}
        id={id}
        description={description}
        completed={completed}
        priority={priority}
        start_time={start_time}
        end_time={end_time}
      />
    </div>
  );
}

const priorityColorMap = new Map<number, string>([
  [0, "#C9C9C9"],
  [1, "#4766f3"],
  [2, "#e1b850"],
  [3, "#ff1010"],
]);

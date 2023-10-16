import React, { useState } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import Todo from "../Todo/Todo";
import "./style.scss";
import { X, Check, Flag } from "react-feather";

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
  priority,
  start_time,
  end_time,
}: Props & React.ComponentProps<typeof Todo>) {
  const [showCheckmark, setShowCheckmark] = useState(false);
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
              onChange={(val) => {
                console.log("clicked: ", val);
              }}
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
            <div className="TodoDetailsModalContainer--Right--Item--Value">
              {start_time || "N/A"}
            </div>
          </div>

          <div className="TodoDetailsModalContainer--Right--Item">
            <div className="TodoDetailsModalContainer--Right--Item--Title">
              End Time
            </div>
            <div className="TodoDetailsModalContainer--Right--Item--Value">
              {end_time || "N/A"}
            </div>
          </div>

          <div className="TodoDetailsModalContainer--Right--Item">
            <div className="TodoDetailsModalContainer--Right--Item--Title">
              Priority
            </div>
            <div className="TodoDetailsModalContainer--Right--Item--Value">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "8px",
                  marginTop: "-10px",
                }}
              >
                <Flag
                  color={priorityFlagColorMap.get(priority)}
                  strokeWidth={2}
                  size={16}
                />
                <p>Priority {priority}</p>
              </div>
            </div>
          </div>
        </div>
        <X
          className="TodoDetailsModalContainer--Close"
          onClick={onClose}
          size={24}
          color="#6A6A6A"
        />
      </div>
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

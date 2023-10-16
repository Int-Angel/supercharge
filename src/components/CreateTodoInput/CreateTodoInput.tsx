import React from "react";
import "./style.scss";
import Button from "../Button/Button";
import PriorityMenu from "../PriorityMenu/PriorityMenu";
import { Flag } from "react-feather";
import DropDownButton from "../DropDownButton/DropDownButton";

interface Props {
  onConfirm: (description: string, priority?: number) => void;
  onCancel: () => void;
  initialDescription?: string;
  initialPriority?: number;
  newTodo?: boolean;
}

export default function CreateTodoInput({
  onConfirm,
  onCancel,
  initialDescription,
  initialPriority,
  newTodo = true,
}: Props) {
  const [description, setDescription] = React.useState(
    initialDescription || "",
  );
  const [priority, setPriority] = React.useState(initialPriority || -1);
  const [showPriority, setShowPriority] = React.useState(false);

  const handleConfirm = () => {
    onConfirm(description, priority);
  };

  const togglePriority = () => {
    setShowPriority(!showPriority);
  };

  return (
    <div className="CreateTodoInput_Container">
      <div className={`CreateTodoInput_Input_Container`}>
        <div className="CreateTodoInputHighlightInputContainer">
          <input
            placeholder="Todo"
            className="CreateTodoInput_Input_Task_Name"
            autoFocus={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="CreateTodoInput_Input_Buttons">
          <div>
            <DropDownButton
              text={priority === -1 ? "Add priority" : `Priority ${priority}`}
              icon={Flag}
              iconColor={priorityFlagColorMap.get(priority)}
              onClick={(e: any) => {
                e.stopPropagation();
                togglePriority();
              }}
              initialSelection={priority}
              onClear={() => setPriority(-1)}
            />
          </div>
        </div>

        {showPriority && (
          <div className="CreateTodoInput_Priority">
            <PriorityMenu
              selectedPriority={priority}
              onClick={(p) => {
                setPriority(p);
                setShowPriority(false);
              }}
              onCloseMenu={() => setShowPriority(false)}
            />
          </div>
        )}
      </div>
      <div className="CreateTodoInput_Buttons">
        <Button text="Cancel" onClick={onCancel} variant="secondary" />
        <Button text={newTodo ? "Add" : "Save"} onClick={handleConfirm} />
      </div>
    </div>
  );
}

const priorityFlagColorMap = new Map<number, string>([
  [-1, "#2F2F2F"],
  [0, "#2F2F2F"],
  [1, "#5d7bff"],
  [2, "#fccf5c"],
  [3, "#ff1010"],
]);

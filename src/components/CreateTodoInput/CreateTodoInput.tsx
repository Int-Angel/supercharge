import React from "react";
import "./style.scss";
import Button from "../Button/Button";
import PriorityMenu from "../PriorityMenu/PriorityMenu";

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
  const [showPriority, setShowPriority] = React.useState(true);

  const handleConfirm = () => {
    onConfirm(description, priority);
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

        {showPriority && (
          <div className="CreateTodoInput_Priority">
            <PriorityMenu
              selectedPriority={priority}
              onClick={(p) => {
                setPriority(p);
                setShowPriority(false);
              }}
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

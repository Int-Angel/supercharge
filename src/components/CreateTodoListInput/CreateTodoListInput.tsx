import React from "react";
import "./style.scss";
import Button from "../Button/Button";

interface Props {
  onConfirm: (title: string) => void;
  onCancel: () => void;
  initialTitle?: string;
  newList?: boolean;
}

export default function CreateTodoListInput({
  onConfirm,
  onCancel,
  initialTitle,
  newList = true,
}: Props) {
  const [title, setTitle] = React.useState(initialTitle || "");

  const handleConfirm = () => {
    onConfirm(title);
    onCancel();
    setTitle("");
  };

  return (
    <div className="CreateTodoListInput_Container">
      <div className={`CreateTodoListInput_Input_Container`}>
        <div className="CreateTodoListInputHighlightInputContainer">
          <input
            placeholder="List title"
            className="CreateTodoListInput_Input_Task_Name"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="CreateTodoListInput_Buttons">
        <Button
          text="Cancel"
          onClick={() => {
            onCancel();
            setTitle("");
          }}
          variant="secondary"
        />
        <Button text={newList ? "Add" : "Save"} onClick={handleConfirm} />
      </div>
    </div>
  );
}

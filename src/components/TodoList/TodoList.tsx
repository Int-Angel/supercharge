import { useState } from "react";
import "./style.scss";
import { ChevronDown, ChevronRight, Plus } from "react-feather";
import Todo from "../Todo/Todo";

interface Props {
  id: string;
  title: string;
}

export default function TodoList({ id, title }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = isExpanded ? ChevronDown : ChevronRight;

  return (
    <div className="TodoListContainer">
      <div className="TodoListTitleContainer">
        <Icon
          className="TodoListIcon"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <p className="TodoListTitle">{title}</p>
      </div>
      {isExpanded ? (
        <div className="TodoListList">
          <Todo
            id="1"
            description="todo description"
            completed={false}
            priority={3}
          />
          <Todo
            id="1"
            description="todo description"
            completed={false}
            priority={3}
          />
          <Todo
            id="1"
            description="todo description"
            completed={false}
            priority={3}
          />
        </div>
      ) : null}

      <div className="TodoListAddButton">
        <Plus className="TodoListAddIcon" size={16} />
        <p className="TodoListAddText">Add a todo</p>
      </div>
    </div>
  );
}

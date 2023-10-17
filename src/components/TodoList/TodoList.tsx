import { useState } from "react";
import "./style.scss";
import { ChevronDown, ChevronRight, Plus } from "react-feather";
import Todo from "../Todo/Todo";
import CreateTodoInput from "../CreateTodoInput/CreateTodoInput";

interface Props {
  id: string;
  title: string;
  todos: any[];
}

export default function TodoList({ id, title, todos }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [addTodo, setAddTodo] = useState(false);

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
          {todos.map((todo) => (
            <Todo
              id={todo.id}
              description={todo.description}
              completed={todo.completed}
              priority={todo.priority}
              key={todo.id}
            />
          ))}
        </div>
      ) : null}

      {addTodo ? (
        <div className="TodoListAddTodoInputContainer">
          <CreateTodoInput
            onConfirm={() => {}}
            onCancel={() => setAddTodo(false)}
            newTodo={true}
          />
        </div>
      ) : (
        <div
          className="TodoListAddButton"
          onClick={() => {
            setAddTodo(true);
          }}
        >
          <Plus className="TodoListAddIcon" size={16} />
          <p className="TodoListAddText">Add a todo</p>
        </div>
      )}
    </div>
  );
}

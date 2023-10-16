import React from "react";
import "./style.scss";
import { Plus } from "react-feather";
import TodoList from "../TodoList/TodoList";
import CreateTodoListInput from "../CreateTodoListInput/CreateTodoListInput";

export default function TodoSidebar() {
  const [showNewListInput, setShowNewListInput] = React.useState(false);

  const scrollToAddSection = () => {
    const toDoList_Add_Section_Button = document.getElementById(
      "toDoList_Add_Section_Button",
    );

    const reactangleContainer = document.getElementById(
      "toDoListContainerRectangle",
    );
    if (toDoList_Add_Section_Button) {
      reactangleContainer?.scrollTo({
        top: toDoList_Add_Section_Button.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const handleAddSectionWithScroll = (): void => {
    setShowNewListInput(true);
    scrollToAddSection();
  };

  return (
    <div className="TodoSidebarContainer">
      <div className="TodoSidebarHeader">
        <h1>Todo</h1>
        <Plus
          className="TodoSidebarNewList"
          onClick={handleAddSectionWithScroll}
        />
      </div>
      <div
        className="TodoSidebarTodoListsContainer"
        id="toDoListContainerRectangle"
      >
        <TodoList id="1" title="List 1" />
        <TodoList id="1" title="List 2" />
        <TodoList id="1" title="List 3" />
        <TodoList id="1" title="List 4" />
        <TodoList id="1" title="List 5" />
        <TodoList id="1" title="List 6" />
        <TodoList id="1" title="List 7" />
        {showNewListInput ? (
          <div
            className="TodoSidebarNewListInputContainer"
            id="toDoList_Add_Section_Button"
          >
            <CreateTodoListInput
              onCancel={() => setShowNewListInput(false)}
              onConfirm={() => {}}
            />
          </div>
        ) : (
          <div
            className="TodoSidebarNewListInputContainer"
            id="toDoList_Add_Section_Button"
          ></div>
        )}
      </div>
    </div>
  );
}

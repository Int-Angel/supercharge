import React from "react";
import "./style.scss";
import { Plus } from "react-feather";
import TodoList from "../TodoList/TodoList";
import CreateTodoListInput from "../CreateTodoListInput/CreateTodoListInput";
import { useCreateTodoList } from "../../hooks/todo/useCreateTodoList";
import { useAuth } from "../../contexts/AuthProvider";

export default function TodoSidebar() {
  const { id } = useAuth();
  const [showNewListInput, setShowNewListInput] = React.useState(false);
  const createTodoListMutation = useCreateTodoList();

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

  const handleCreateTodoList = (title: string) => {
    createTodoListMutation.mutate(
      { title, user_id: id },
      {
        onSuccess: () => {
          setShowNewListInput(false);
        },
        onError: (error: any) => {
          console.log("Error: ", error);
        },
      },
    );
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
              onConfirm={handleCreateTodoList}
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

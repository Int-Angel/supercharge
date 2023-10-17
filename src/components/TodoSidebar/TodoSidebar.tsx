import React from "react";
import "./style.scss";
import { Plus } from "react-feather";
import TodoList from "../TodoList/TodoList";
import CreateTodoListInput from "../CreateTodoListInput/CreateTodoListInput";
import { useCreateTodoList } from "../../hooks/todo/useCreateTodoList";
import { useAuth } from "../../contexts/AuthProvider";
import { useGetTodoListsFromUserWithTodos } from "../../hooks/todo/useGetTodoListsFromUserWithTodos";

export default function TodoSidebar() {
  const { id } = useAuth();
  const [showNewListInput, setShowNewListInput] = React.useState(false);
  const {
    data: todoLists,
    isError,
    isLoading,
    refetch,
  } = useGetTodoListsFromUserWithTodos(id);
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
        <h1>To Dos</h1>
        <Plus
          className="TodoSidebarNewList"
          onClick={handleAddSectionWithScroll}
        />
      </div>
      <div
        className="TodoSidebarTodoListsContainer"
        id="toDoListContainerRectangle"
      >
        {todoLists?.map((todoList) => (
          <TodoList
            id={todoList.id}
            title={todoList.title}
            key={todoList.id}
            todos={todoList.todo}
          />
        ))}

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

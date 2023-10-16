import React from "react";
import "./style.scss";
import { Plus } from "react-feather";
import TodoList from "../TodoList/TodoList";

export default function TodoSidebar() {
  return (
    <div className="TodoSidebarContainer">
      <div className="TodoSidebarHeader">
        <h1>Todo</h1>
        <Plus className="TodoSidebarNewList" />
      </div>
      <div className="TodoSidebarTodoListsContainer">
        <TodoList id="1" title="List 1" />
        <TodoList id="1" title="List 2" />
        <TodoList id="1" title="List 3" />
        <TodoList id="1" title="List 4" />
        <TodoList id="1" title="List 5" />
        <TodoList id="1" title="List 6" />
        <TodoList id="1" title="List 7" />
      </div>
    </div>
  );
}

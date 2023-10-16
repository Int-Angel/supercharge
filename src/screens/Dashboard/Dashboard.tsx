import React from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import TodoList from "../../components/TodoList/TodoList";

export default function Dashboard() {
  return (
    <div className="DashboardContainer">
      <Sidebar />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <TodoList id="1" title="Todo List Title" />
      </div>
    </div>
  );
}

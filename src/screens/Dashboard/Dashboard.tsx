import React from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Button from "../../components/Button/Button";
import Todo from "../../components/Todo/Todo";

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
        <Todo
          id="1"
          description="todo description"
          completed={false}
          priority={3}
        />
      </div>
    </div>
  );
}

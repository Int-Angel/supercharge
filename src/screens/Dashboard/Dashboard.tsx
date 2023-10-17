import React from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import TodoSidebar from "../../components/TodoSidebar/TodoSidebar";
import Calendar from "../../components/Calendar/Calendar";

export default function Dashboard() {
  return (
    <div className="DashboardContainer">
      <Sidebar />
      <TodoSidebar />
      <Calendar />
    </div>
  );
}

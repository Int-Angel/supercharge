import React from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Button from "../../components/Button/Button";

export default function Dashboard() {
  return (
    <div className="DashboardContainer">
      <Sidebar />
    </div>
  );
}

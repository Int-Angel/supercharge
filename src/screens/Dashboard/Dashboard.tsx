import React, {useState} from "react";
import "./style.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import TodoSidebar from "../../components/TodoSidebar/TodoSidebar";
import Calendar from "../../components/Calendar/Calendar";
import Pomodoro from "../../components/Pomodoro/Pomodoro";
import PomodoroModal from "../../components/Pomodoro/PomodoroModal";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="DashboardContainer">
      <Sidebar setIsModalOpen={setIsModalOpen}/>
      <TodoSidebar />
      <Calendar />
      <PomodoroModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <Pomodoro />
      </PomodoroModal>
    </div>
  );
}

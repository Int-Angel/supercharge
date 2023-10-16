import React from "react";
import LogIn from "./screens/LogIn";
import Dashboard from "./screens/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      <Dashboard />
    </div>
  );
}

export default App;

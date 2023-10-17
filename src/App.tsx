import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./screens/LogIn";
import Dashboard from "./screens/Dashboard/Dashboard";
import "@fontsource/poppins";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/login"} element={<LogIn />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

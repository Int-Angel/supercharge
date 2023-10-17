import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./screens/LogIn";
import Dashboard from "./screens/Dashboard/Dashboard";
import "@fontsource/poppins";
import { AuthProvider } from "./contexts/AuthProvider";
import RequireAuth from "./contexts/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path={"/"}
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path={"/login"} element={<LogIn />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Tasks } from "./pages/Tasks";

function App() {
  const handleRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route
          path="/"
          element={
            handleRoute() ? (
              <Navigate to={"/tasks"} />
            ) : (
              <Navigate to={"/signin"} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

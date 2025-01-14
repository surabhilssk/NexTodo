import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export const AppBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("function called");
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <div className="flex justify-between w-screen bg-slate-900 py-4 px-4 rounded-b-lg">
      <div className="flex justify-center flex-col text-white font-extrabold">
        NexTodo🎉
      </div>
      <div>
        <Button text="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
};

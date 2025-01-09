import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import { data } from "react-router-dom";

interface TaskListProps {
  title: string;
  isCompleted: boolean;
  id: string;
}
export const TaskList = ({ title, isCompleted, id }: TaskListProps) => {
  const [isChecked, setIsChecked] = useState(isCompleted);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    const newComplete = !isCompleted;
    axios.put(
      `${BACKEND_URL}/api/v1/todos/${id}`,
      {
        completed: newComplete,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  };

  return (
    <div>
      <nav className="flex min-w-[240px] flex-col gap-1">
        <div className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 cursor-pointer">
          <label className="flex cursor-pointer items-center px-3 py-2">
            <div className="inline-flex items-center">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded-full shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <label className="cursor-pointer ml-3 text-slate-600 text-sm">
                <div
                  className={`font-normal text-sm ${
                    isChecked === true ? "line-through" : null
                  }`}
                >
                  {title}
                </div>
                <div
                  className={`mt-[2px] border-2 px-3 pt-[2px] pb-[3px] text-xs font-medium rounded-full max-w-fit ${
                    isChecked === true ? "hidden" : "visible"
                  }`}
                >
                  Tomorrow
                </div>
              </label>
            </div>
          </label>
        </div>
      </nav>
    </div>
  );
};

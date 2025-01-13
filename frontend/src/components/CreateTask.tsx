import { CheckIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useState } from "react";
import { TodoCreateType } from "@surabhilssk/project-mache";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export const CreateTask = ({ fetchTasks }: { fetchTasks: () => void }) => {
  const createTask = async () => {
    await axios.post(
      `${BACKEND_URL}/api/v1/todos`,
      {
        title: taskData.title,
        description: taskData.description,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchTasks();
  };

  const [taskData, setTaskData] = useState<TodoCreateType>({
    title: "",
    description: "",
  });
  return (
    <div>
      <div>
        <Drawer>
          <DrawerTrigger asChild className="text-center">
            <button className="relative inline-flex h-12 w-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 text-sm font-medium text-white backdrop-blur-3xl">
                <PencilSquareIcon aria-hidden="true" className="size-5" />
              </span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="flex items-center">
            <DrawerHeader>
              <DrawerTitle className="font-extrabold text-4xl">
                Create Todo
              </DrawerTitle>
            </DrawerHeader>
            <div>
              <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Title
                </label>
                <input
                  placeholder="Enter title"
                  type="text"
                  id="default-input"
                  onChange={(e) => {
                    setTaskData({
                      ...taskData,
                      title: e.target.value,
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <input
                  placeholder="Enter description"
                  type="text"
                  id="large-input"
                  onChange={(e) => {
                    setTaskData({
                      ...taskData,
                      description: e.target.value,
                    });
                  }}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <button
                  className="relative inline-flex h-12 w-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  onClick={createTask}
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 pb-[3px] text-sm font-medium text-white backdrop-blur-3xl">
                    <CheckIcon aria-hidden="true" className="size-6" />
                  </span>
                </button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

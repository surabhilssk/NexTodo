import { CreateTask } from "@/components/CreateTask";
import { TaskList } from "../components/TaskList";
import { useTasks } from "../hooks";
import { AppBar } from "@/components/ui/AppBar";

export const Tasks = () => {
  const { loading, tasks, fetchTasks } = useTasks();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-purple-50">
      <div className="fixed">
        <AppBar />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="relative border-2 rounded-lg min-h-72 max-h-96 min-w-80 overflow-y-auto scrollbar-hide px-2 py-1 bg-white">
          <div>
            {tasks.length === 0 ? (
              <div className="min-h-72 flex justify-center items-center text-lg font-semibold">
                Start creating your todos...✒️
              </div>
            ) : (
              tasks.map(function (task) {
                return task.id === null ? null : (
                  <TaskList
                    title={task.title}
                    isCompleted={task.completed}
                    id={task.id}
                    modalTitle={task.title}
                    modalDescription={task.description}
                    modalCreatedAt={task.createdAt}
                    fetchFunction={fetchTasks}
                  />
                );
              })
            )}
          </div>
          <div className="fixed bottom-4 right-4">
            <CreateTask fetchTasks={fetchTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

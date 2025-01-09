import { TaskList } from "../components/TaskList";
import { useTasks } from "../hooks";
export const Tasks = () => {
  const { loading, tasks } = useTasks();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {tasks.map(function (task) {
        return (
          <TaskList
            title={task.title}
            isCompleted={task.completed}
            id={task.id}
          />
        );
      })}
    </div>
  );
};

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface TasksProps {
    title: string;
    description: string;
    completed: boolean;
    id: string;
    createdAt: string;
}

export const useTasks = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<TasksProps[]>([]);

    useEffect(() => {
        const fetchTasks = () => {
            axios.get(`${BACKEND_URL}/api/v1/todos/bulk`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((response) => {
                // Sorting tasks by createdAt date
                const sortedTasks = response.data.todos.sort((a: TasksProps, b: TasksProps) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setTasks(sortedTasks);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        };

        const intervalId = setInterval(fetchTasks, 10000);
        fetchTasks();

        return () => clearInterval(intervalId);
    }, []);

    return {
        loading,
        tasks,
    };
};

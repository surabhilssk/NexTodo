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

    const fetchTasks = () => {
        console.log("fetch is called")
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

    useEffect(() => {
        fetchTasks();
    }, []);

    return {
        loading,
        tasks,
        fetchTasks
    };
};

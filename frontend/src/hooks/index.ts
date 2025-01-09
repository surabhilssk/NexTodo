import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";
import axios from "axios";


interface TasksProps{
    title: string,
    description: string,
    completed: boolean,
    id: string
}
export const useTasks = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<TasksProps[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/todos/bulk`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response)=>{
            setTasks(response.data.todos);
            setLoading(false);
        })
    },[])

    return {
        loading,
        tasks,
    }

}
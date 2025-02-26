"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{
    id?: number;
    title: string;
    description: string;
  }>({ id: undefined, title: "", description: "" });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:8181/tasks/tasks")
      .then((response) => {
        if (response.data.success) {
          const fetchedTasks: Task[] = response.data.tasks
            .filter((task: any) => !task.done)
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 5) // Latest 5 tasks only
            .map((task: any) => ({
              id: task.id,
              title: task.topic,
              description: task.description,
              done: task.done,
            }));
          setTasks(fetchedTasks);
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const addOrUpdateTask = () => {
    if (newTask.title && newTask.description) {
      if (isEditing && newTask.id !== undefined) {
        axios
          .put(`http://localhost:8181/tasks/task/update/${newTask.id}`, {
            topic: newTask.title,
            description: newTask.description,
          })
          .then(() => {
            fetchTasks();
            setNewTask({ id: undefined, title: "", description: "" });
            setIsEditing(false);
          })
          .catch((error) => console.error("Error updating task:", error));
      } else {
        axios
          .post("http://localhost:8181/tasks/task/save", {
            topic: newTask.title,
            description: newTask.description,
            taskCategory: "General",
            done: false,
          })
          .then(() => {
            fetchTasks();
            setNewTask({ id: undefined, title: "", description: "" });
          })
          .catch((error) => console.error("Error adding task:", error));
      }
    }
  };

  const editTask = (task: Task) => {
    setNewTask({
      id: task.id,
      title: task.title,
      description: task.description,
    });
    setIsEditing(true);
  };

  const markTaskDone = (id: number) => {
    axios
      .put(`http://localhost:8181/tasks/task/update/${id}`, { done: true })
      .then(() => fetchTasks())
      .catch((error) => console.error("Error marking task as done:", error));
  };

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 items-center justify-center p-4 w-full">
      <div className="bg-white p-8 shadow-2xl rounded-lg w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Panel - Task Input */}
        <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            {isEditing ? "Edit Task" : "Add a Task"}
          </h2>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={addOrUpdateTask}
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* Right Panel - Task List */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks available</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-100 p-4 mb-3 rounded-lg flex justify-between items-center shadow-md"
              >
                <div
                  onClick={() => editTask(task)}
                  className="cursor-pointer p-1 rounded-md"
                >
                  <h3 className="font-semibold text-gray-800">
                    {truncateText(task.title, 15)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {truncateText(task.description, 15)}
                  </p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                  onClick={() => markTaskDone(task.id)}
                >
                  Done
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

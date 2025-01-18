"use client";
import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { fetchProject } from "@/services/projectService";
import {
  getTasks,
  createTask,
  updateTask,
} from "../../../../services/taskService";
import TaskItem from "../../../components/TaskItem";
import Toast from "@/app/components/Toast";
import LoadSpinner from "@/app/components/LoadSpinner";

const TasksPage = ({ params }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [showToast]);

  useEffect(() => {
    fetchProjectName();
  }, []);

  const fetchProjectName = async () => {
    const project = await fetchProject(params.projectId);
    setProjectName(project.title);
  };

  const fetchTasks = async () => {
    setIsLoading(true); // Set loading to true before fetching tasks
    const data = await getTasks(params.projectId);
    setTasks(data);
    setIsLoading(false); // Set loading to false after fetching tasks
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddTask = async () => {
    await createTask(params.projectId, {
      title: newTaskTitle,
      description: newTaskDescription,
    });
    fetchTasks();
    setNewTaskTitle("");
    setNewTaskDescription("");
    setIsModalVisible(false);
    setShowToast(true); // Trigger toast notification
  };

  return (
    <div>
      <h1 className="text-3xl m-4 font-bold text-slate-600 text-center">
        Tasks for {projectName} Project
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadSpinner /> {/* Render loading spinner while data is loading */}
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-8">
          No tasks for this project.
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
          ))}
        </div>
      )}
      <button
        className="bg-gray-500 py-2 px-4 rounded fixed bottom-7 right-8"
        onClick={showModal}
      >
        <PlusIcon className="h-6 w-6 text-white" />
      </button>
      <div
        id="task-create"
        className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ${
          isModalVisible ? "" : "hidden"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-white border-none transition-all ease-out duration-300 hover:bg-gray-700 py-2 px-4 rounded"
          onClick={() => setIsModalVisible(false)}
        >
          X
        </button>
        <div className="bg-gray-800 p-4 rounded flex flex-col space-y-4">
          <input
            className="w-full p-2 rounded bg-gray-200 border border-gray-600"
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New Task Title"
          />
          <input
            className="w-full p-2 rounded bg-gray-200 border border-gray-600"
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="New Task Description"
          />
          <button className="bg-gray-500 p-2 rounded" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>
      {showToast && (
        <Toast
          message="Task added successfully!"
          show={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default TasksPage;

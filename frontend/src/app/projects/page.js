"use client";
import React, { useState } from "react";
import ProjectsBody from "../components/ProjectsBody";
import Sidebar from "../components/projrctsSidebar";
import AddProject from "../components/AddProject";
import Dashboard from "../dashboard/page";
import SettingsPage from "../components/SettingsPage";
import ProtectedRoute from "../components/ProtectedRoute";

const ProjectsPage = () => {
  const [currentPanel, setCurrentPanel] = useState("dashboard"); // Default panel
  const [isLoading, setIsLoading] = useState(false); // Optional loading state

  const handleSelectPanel = (panel) => {
    const validPanels = ["dashboard", "projects", "addProject", "settings"];
    if (validPanels.includes(panel)) {
      setCurrentPanel(panel);
    } else {
      console.error(`Invalid panel: ${panel}`);
    }
  };

  const handleProjectAdded = (newProject) => {
    try {
      console.log("New Project Added:", newProject);
      // Trigger fetch or state update here if required
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  };

  const renderPanelContent = () => {
    if (isLoading) {
      return <div>Loading...</div>; // Replace with a spinner
    }

    switch (currentPanel) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <ProjectsBody />;
      case "addProject":
        return <AddProject onProjectAdded={handleProjectAdded} />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row bg-gray-800">
        <Sidebar onSelectPanel={handleSelectPanel} activePanel={currentPanel} />
        <div className="flex-grow">{renderPanelContent()}</div>
      </div>
    </ProtectedRoute>
  );
};

export default ProjectsPage;

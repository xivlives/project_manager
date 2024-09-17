'use client';
import React, { useState } from 'react';
import ProjectsBody from '../components/ProjectsBody';
import Sidebar from '../components/projrctsSidebar';
import AddProject from '../components/AddProject';

const ProjectsPage = () => {
  const [currentPanel, setCurrentPanel] = useState('projects');

  const handleSelectPanel = (panel) => {
    setCurrentPanel(panel);
  };

  const handleProjectAdded = (newProject) => {
    // Update your state or fetch new projects after adding a new project
    console.log('New Project Added:', newProject);
  };

  const renderPanelContent = () => {
    switch (currentPanel) {
      case 'projects':
        return <ProjectsBody />;
      case 'addProject':
        return <AddProject onProjectAdded={handleProjectAdded} />;
      case 'settings':
        return <div>Settings Panel Content</div>;
      default:
        return <ProjectsBody />;
    }
  };

  return (
    <div className='flex flex-row bg-gray-800'>
      <Sidebar onSelectPanel={handleSelectPanel} />
      <main className='flex-1 p-6'>
        {renderPanelContent()}
      </main>
    </div>
  );
};

export default ProjectsPage;

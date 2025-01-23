import Link from 'next/link';
import { useState } from 'react';

const Sidebar = ({ onSelectPanel }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // State to track the active tab
  const username = localStorage.getItem('username');
  console.log(username);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePanelChange = (panel) => {
    setActiveTab(panel); // Update the active tab
    onSelectPanel(panel); // Notify parent about the selected panel
  };

  return (
    <div
      className={`fixed top-0 left-0 ${isOpen ? 'w-64' : 'w-20'} h-screen bg-slate-600 text-white transition-width duration-300`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <h1 className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'}`}>HI, {username}</h1>
          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul>
            <li>
              <button
                onClick={() => handlePanelChange('dashboard')}
                className={`block p-4 w-full text-left hover:bg-gray-700 ${
                  activeTab === 'dashboard' ? 'bg-gray-700 font-bold' : ''
                }`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePanelChange('projects')}
                className={`block p-4 w-full text-left hover:bg-gray-700 ${
                  activeTab === 'projects' ? 'bg-gray-700 font-bold' : ''
                }`}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePanelChange('addProject')}
                className={`block p-4 w-full text-left hover:bg-gray-700 ${
                  activeTab === 'addProject' ? 'bg-gray-700 font-bold' : ''
                }`}
              >
                Add Project
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePanelChange('settings')}
                className={`block p-4 w-full text-left hover:bg-gray-700 ${
                  activeTab === 'settings' ? 'bg-gray-700 font-bold' : ''
                }`}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

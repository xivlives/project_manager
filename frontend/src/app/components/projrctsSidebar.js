import Link from 'next/link';
import { useState } from 'react';

const Sidebar = ({ onSelectPanel }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePanelChange = (panel) => {
    onSelectPanel(panel);
  };

  return (
    <div className={`flex ${isOpen ? 'w-64' : 'w-20'} h-screen bg-slate-600 text-white transition-width duration-300`}>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <h1 className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'}`}>HI, User</h1>
          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <nav className="flex-1 mt-4">
          <ul>
            <li>
                <Link href={'/'}>
                     <button className="block p-4 hover:bg-gray-700">Home</button>
                </Link>
            </li>
            <li>
              <button onClick={() => handlePanelChange('projects')} className="block p-4 hover:bg-gray-700">Projects</button>
            </li>
            <li>
              <button onClick={() => handlePanelChange('addProject')} className="block p-4 hover:bg-gray-700">Add Project</button>
            </li>
            <li>
              <button onClick={() => handlePanelChange('settings')} className="block p-4 hover:bg-gray-700">Settings</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

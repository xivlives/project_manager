import React, { useState } from 'react';
import { logoutUser } from '@/services/authService';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    logoutUser();
    // Redirect to login page (if applicable)
    window.location.href = '/auth/login';
  };

  return (
    <div className="h-screen ml-64 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-slate-700 mb-6">Settings</h1>

      {/* Account Management Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      {/* Preferences Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="flex items-center justify-between mb-4">
          <span>Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {darkMode ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span>Email Notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {notifications ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

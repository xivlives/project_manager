import { useState } from 'react';
import { createProject } from '@/services/projectService';

const AddProject = ({ onProjectAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear any previous error
    setError(null);
    setLoading(true);
  
    try {
      // Call the service to add a project
      const newProject = await createProject({ userId, title, description });
  
      // Optionally, call a callback to update the parent state after adding the project
      if (onProjectAdded) {
        onProjectAdded(newProject);
      }
  
      setResponseMessage("Project added successfully");
  
      // Clear the form after successful submission
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add project');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='h-screen ml-64'>
      <div className="max-w-md mx-auto bg-gray-700 text-white p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 p-2 rounded text-white"
        >
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default AddProject;

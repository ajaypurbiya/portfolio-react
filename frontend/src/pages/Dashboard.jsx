import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import AddProjectForm from '../components/AddProjectForm';
import ProjectCard from '../components/ProjectCard';
import MessageList from '../components/MessageList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects", err);
      setError('Failed to fetch projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        alert("Delete failed: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const sidebarItems = [
    { id: 'tasks', label: 'Tasks', icon: '📋' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'messages', label: 'Messages', icon: '📧' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 text-xl font-bold text-gray-800 border-b">
          Admin Panel
        </div>
        <nav className="flex-grow mt-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button 
            onClick={logout}
            className="w-full bg-red-50 text-red-600 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-grow p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            Manage {activeTab}
          </h1>
          <div className="text-sm text-gray-500">
            Logged in as: <span className="font-semibold">{user?.email}</span>
          </div>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Dynamic Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[400px]">
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Your Tasks</h2>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  + Add Task
                </button>
              </div>
              {loading ? (
                <div className="flex items-center justify-center h-32 text-gray-500">
                  Loading tasks...
                </div>
              ) : tasks.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-lg h-32 flex items-center justify-center text-gray-400">
                  No tasks found. Create your first task!
                </div>
              ) : (
                <div className="grid gap-4">
                  {tasks.map((task) => (
                    <div key={task._id} className="p-4 border rounded-lg hover:shadow-md transition">
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-gray-600">{task.description}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.completed ? 'Done' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
{activeTab === 'projects' && (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold">Your Projects</h2>
      <button 
        onClick={() => setShowForm(!showForm)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        {showForm ? 'Close Form' : '+ Add New'}
      </button>
    </div>

{showForm && <AddProjectForm refreshProjects={fetchProjects} />}

    <div className="mt-6 border-2 border-dashed border-gray-200 rounded-lg h-32 flex items-center justify-center text-gray-400">
      Project list will appear here...
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {projects.map(proj => (
        <ProjectCard 
          key={proj._id} 
          project={proj} 
          isAdmin={true} 
          onDelete={handleDelete} 
        />
      ))}
    </div>
  </div>
)}
          
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-lg font-semibold">Inbox</h2>
              <MessageList />
            </div>
          )}
          
          {activeTab === 'skills' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Skills</h2>
              <p className="text-gray-600">Skill management coming soon...</p>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <p className="text-gray-600">User settings coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

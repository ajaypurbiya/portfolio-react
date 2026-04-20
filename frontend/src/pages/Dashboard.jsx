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
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

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
    { id: 'tasks', label: 'Tasks', icon: 'bi-card-checklist' },
    { id: 'projects', label: 'Projects', icon: 'bi-folder2-open' },
    { id: 'messages', label: 'Messages', icon: 'bi-envelope' },
    { id: 'skills', label: 'Skills', icon: 'bi-tools' },
    { id: 'settings', label: 'Settings', icon: 'bi-gear' },
  ];

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

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/tasks', newTask);
      setNewTask({ title: '', description: '' });
      setShowTaskForm(false);
      fetchTasks(); // Refresh tasks list
    } catch (err) {
      setError('Failed to add task: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-light min-vh-100 pt-5 pb-5">
      <div className="container-xl pt-4 mt-4">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-4 col-lg-3 d-none d-md-block">
            <aside className="card rounded-4 shadow-sm p-4 sticky-top border-0" style={{ top: '100px' }}>
              <h5 className="fw-bold text-primary mb-4 pb-3 border-bottom">
                <i className="bi bi-speedometer2 me-2"></i>Admin Panel
              </h5>
              <nav className="nav nav-pills flex-column gap-2 mb-4">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-link text-start rounded-3 d-flex align-items-center transition-all ${
                      activeTab === item.id 
                        ? 'active fw-bold shadow-sm' 
                        : 'text-muted hover-bg-light'
                    }`}
                  >
                    <i className={`bi ${item.icon} me-3 fs-5`}></i>
                    {item.label}
                  </button>
                ))}
              </nav>
              <button 
                onClick={logout}
                className="btn btn-danger bg-opacity-10 text-danger w-100 fw-bold rounded-3 border-0 lift-on-hover"
              >
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </aside>
          </div>

          {/* Main Content Area */}
          <div className="col-md-8 col-lg-9">
            {/* Mobile Navigation (Visible only on small screens) */}
            <div className="d-md-none mb-4 overflow-auto pb-2" style={{ whiteSpace: 'nowrap' }}>
              <div className="d-flex gap-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`btn rounded-pill flex-shrink-0 d-inline-flex align-items-center ${
                      activeTab === item.id 
                        ? 'btn-primary shadow-sm fw-bold' 
                        : 'btn-outline-secondary bg-light text-muted'
                    }`}
                  >
                    <i className={`bi ${item.icon} me-2`}></i>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Header */}
            <header className="card p-4 rounded-4 shadow-sm mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center border-0">
              <div>
                <h1 className="h3 fw-bold text-capitalize mb-1">
                  Manage {activeTab}
                </h1>
                <div className="text-muted small">
                  Logged in as: <span className="fw-semibold text-primary">{user?.email}</span>
                </div>
              </div>
            </header>

            {error && (
              <div className="alert alert-danger border-0 shadow-sm py-2 px-3 small fw-medium mb-4">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
              </div>
            )}

            {/* Dynamic Content Panel */}
            <div className="card rounded-4 shadow-sm p-4 p-md-5 border-0" style={{ minHeight: '500px' }}>
              
              {activeTab === 'tasks' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h4 fw-bold mb-0">Your Tasks</h2>
                    <button 
                      onClick={() => setShowTaskForm(!showTaskForm)}
                      className={`btn ${showTaskForm ? 'btn-secondary' : 'btn-primary'} rounded-pill lift-on-hover px-4`}
                    >
                      <i className={`bi ${showTaskForm ? 'bi-x-lg' : 'bi-plus-lg'} me-1`}></i> {showTaskForm ? 'Close Form' : 'Add Task'}
                    </button>
                  </div>
                  
                  {showTaskForm && (
                    <div className="mb-5 card bg-light p-4 rounded-4 border-0 shadow-sm">
                      <h4 className="fw-bold mb-3 h5">Create New Task</h4>
                      <form onSubmit={handleAddTask}>
                        <div className="mb-3">
                          <input 
                            type="text" 
                            className="form-input mb-0 mt-1" 
                            placeholder="Task Title" 
                            required 
                            value={newTask.title}
                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                          />
                        </div>
                        <div className="mb-3">
                          <textarea 
                            className="form-input mb-0 mt-1" 
                            placeholder="Task Description" 
                            required 
                            rows="3"
                            value={newTask.description}
                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 fw-bold">Save Task</button>
                      </form>
                    </div>
                  )}

                  {loading ? (
                    <div className="text-center text-muted py-5">
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Loading tasks...
                    </div>
                  ) : !showTaskForm && tasks.length === 0 ? (
                    <div className="text-center p-5 card border rounded-4 bg-light text-muted mt-4 border-dashed">
                      <i className="bi bi-clipboard-x display-4 opacity-50 mb-3 d-block"></i>
                      No tasks found. Create your first task!
                    </div>
                  ) : (
                    <div className="row g-3">
                      {tasks.map((task) => (
                        <div key={task._id} className="col-12">
                          <div className="p-4 card bg-light rounded-4 border-0 lift-on-hover d-flex flex-row justify-content-between align-items-start shadow-sm">
                            <div>
                              <h3 className="h6 fw-bold mb-1">{task.title}</h3>
                              <p className="text-muted small mb-0">{task.description}</p>
                            </div>
                            <span className={`badge rounded-pill ${
                              task.completed ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'
                            }`}>
                              {task.completed ? 'Done' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'projects' && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h4 fw-bold mb-0">Your Projects</h2>
                    <button 
                      onClick={() => setShowForm(!showForm)}
                      className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'} rounded-pill lift-on-hover px-4`}
                    >
                      <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-plus-lg'} me-1`}></i> {showForm ? 'Close Form' : 'Add New'}
                    </button>
                  </div>

                  {showForm && (
                    <div className="mb-5">
                      <AddProjectForm refreshProjects={fetchProjects} />
                    </div>
                  )}

                  {!showForm && projects.length === 0 && (
                    <div className="text-center p-5 card border rounded-4 bg-light text-muted mt-4 border-dashed">
                      <i className="bi bi-folder2-open display-4 opacity-50 mb-3 d-block"></i>
                      Project list will appear here...
                    </div>
                  )}

                  <div className="row g-4 mt-2">
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
                  <h2 className="h4 fw-bold mb-4">Inbox</h2>
                  <MessageList />
                </div>
              )}
              
              {activeTab === 'skills' && (
                <div className="text-center py-5">
                  <i className="bi bi-tools display-1 text-muted opacity-25 mb-3 d-block"></i>
                  <h2 className="h4 fw-bold mb-2">Skills Management</h2>
                  <p className="text-muted">Skill management interface coming soon...</p>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="text-center py-5">
                  <i className="bi bi-gear display-1 text-muted opacity-25 mb-3 d-block"></i>
                  <h2 className="h4 fw-bold mb-2">Account Settings</h2>
                  <p className="text-muted">User settings coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import axios from 'axios';

const AddProjectForm = ({ refreshProjects }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null); // New state for the file

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setImage(e.target.files[0]);
    } else {
      switch (e.target.name) {
        case 'title':
          setTitle(e.target.value);
          break;
        case 'description':
          setDescription(e.target.value);
          break;
        case 'techStack':
          setTechStack(e.target.value);
          break;
        case 'link':
          setLink(e.target.value);
          break;
        // eslint-disable-next-line no-fallthrough
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Use FormData to handle file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('techStack', techStack);
    formData.append('link', link);
    if (image) formData.append('image', image);

    try {
      await axios.post('/projects', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert("Project added with image!");
      // Reset form
      setTitle('');
      setDescription('');
      setTechStack('');
      setLink('');
      setImage(null);
      if (refreshProjects) refreshProjects();
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800">Add New Project</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g. Crypto Tracker"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="What does this project do?"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tech Stack (comma separated)</label>
        <input
          type="text"
          name="techStack"
          value={techStack}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g. React, Node, MongoDB"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Project Link (GitHub/Live)</label>
        <input
          type="url"
          name="link"
          value={link}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="https://github.com/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Project Screenshot</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-bold hover:bg-indigo-700 transition">
        Save Project
      </button>
    </form>
  );
};

export default AddProjectForm;

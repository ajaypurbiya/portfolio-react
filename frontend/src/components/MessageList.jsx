import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (window.confirm("Delete this message?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/messages/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMessages();
      } catch (err) {
        alert("Failed to delete message");
      }
    }
  };

  if (loading) return <p className="text-gray-500">Loading messages...</p>;

  return (
    <div className="space-y-4">
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div key={msg._id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-900">{msg.name}</h4>
                <p className="text-sm text-indigo-600 font-medium">{msg.email}</p>
              </div>
              <button 
                onClick={() => deleteMessage(msg._id)}
                className="text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">{msg.message}</p>
            <p className="text-[10px] text-gray-400 mt-2">
              {new Date(msg.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No messages found.</p>
      )}
    </div>
  );
};

export default MessageList;
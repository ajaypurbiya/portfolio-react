import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/messages', {
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
        await axios.delete(`/messages/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Remove the deleted message from the screen
        setMessages(messages.filter(msg => msg._id !== id));
      } catch (err) {
        console.error("Error deleting message", err);
        alert("Failed to delete message.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center text-muted py-5">
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading messages...
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center p-5 border rounded-4 bg-light text-muted mt-4" style={{ borderStyle: 'dashed' }}>
        <i className="bi bi-envelope-open display-4 opacity-50 mb-3 d-block"></i>
        Your inbox is empty.
      </div>
    );
  }

  return (
    <div className="row g-3">
      {messages.map((msg) => (
        <div key={msg._id} className="col-12">
          <div className="p-4 bg-light rounded-4 border-0 lift-on-hover shadow-sm position-relative">
            <button 
              onClick={() => deleteMessage(msg._id)}
              className="btn btn-danger bg-opacity-10 text-danger border-0 rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
              title="Delete Message"
            >
              <i className="bi bi-trash-fill"></i>
            </button>
            <h5 className="fw-bold mb-1">{msg.name}</h5>
            <a href={`mailto:${msg.email}`} className="text-primary text-decoration-none small fw-medium mb-3 d-inline-block">
              <i className="bi bi-reply-fill me-1"></i>{msg.email}
            </a>
            <p className="text-muted mb-0 mt-2">{msg.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
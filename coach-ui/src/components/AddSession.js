import React, { useState } from 'react';
import { createSession } from '../services/sessionService';

const AddSession = () => {
  const [session, setSession] = useState({
    title: '',
    description: '',
    duration: '',
    price: ''
  });

  const handleChange = (e) => {
    setSession({
      ...session,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSession(session);
    setSession({ title: '', description: '', duration: '', price: '' });
  };

  return (
    <div>
      <h2>Add Session</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={session.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={session.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="duration"
          value={session.duration}
          onChange={handleChange}
          placeholder="Duration"
        />
        <input
          type="number"
          name="price"
          value={session.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddSession;

import React, { useEffect, useState } from 'react';
import { getSessionById, updateSession } from '../services/sessionService';
import { useParams, useHistory } from 'react-router-dom';

const EditSession = () => {
  const { id } = useParams();
  const history = useHistory();
  const [session, setSession] = useState({
    title: '',
    description: '',
    duration: '',
    price: ''
  });

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    const result = await getSessionById(id);
    setSession(result.data);
  };

  const handleChange = (e) => {
    setSession({
      ...session,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSession(id, session);
    history.push('/');
  };

  return (
    <div>
      <h2>Edit Session</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditSession;

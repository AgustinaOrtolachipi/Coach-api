import React, { useEffect, useState } from 'react';
import { getSessions, deleteSession } from '../services/sessionService';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const result = await getSessions();
    setSessions(result.data);
  };

  const handleDelete = async (id) => {
    await deleteSession(id);
    loadSessions();
  };

  return (
    <div>
      <h2>Sessions</h2>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            {session.title} - {session.description} - ${session.price}
            <button onClick={() => handleDelete(session.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;

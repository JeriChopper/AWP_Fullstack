import React, { useState, useEffect } from 'react';
import ActionAreaCard from '../components/ActionAreaCard';



const Find = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/listx')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Find Users</h1>
      <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
        {users.map(user => (
          <ActionAreaCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Find;
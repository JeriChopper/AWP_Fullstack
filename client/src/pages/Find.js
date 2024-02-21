import React, { useState, useEffect } from 'react';
import ActionAreaCard from '../components/ActionAreaCard';



const Find = ({ user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users
    fetch('/listx')
      .then(response => response.json())
      .then(data => {
        const filteredUsers = data.filter(u => u.email !== user.email);
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [user]); // Trigger the effect when the user changes

  return (
    <div>
      <h1>Find Users</h1>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {users.map(u => (
          <ActionAreaCard key={u.email} user={u} />
        ))}
      </div>
    </div>
  );
};

export default Find;
import React, { useState, useEffect } from 'react';
import ActionAreaCard from '../components/ActionAreaCard';

const Find = ({ user, jwt }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users
    fetch('/listx', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const filteredUsers = data.filter(u => u.email !== user.email);
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [user, jwt]); // Trigger the effect when the user or jwt changes

  
  const handleLikeClick = async (likedUserId) => {
    try {
      const response = await fetch('/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({ likedUserId }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error liking user:', error);
    }
  };

  return (
    <div>
      <h1>Find Users</h1>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {users.map(u => (
          <ActionAreaCard key={u.email} user={u} onLikeClick={handleLikeClick} />
        ))}
      </div>
    </div>
  );
};

export default Find;
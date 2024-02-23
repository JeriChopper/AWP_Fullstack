/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code


/// Imports and Dependencies (ActionAreaCard.js Component)
import React, { useState, useEffect } from 'react';
import ActionAreaCard from '../components/ActionAreaCard';


/// Find function takes user and jwt as prop from App.js to filter data and verify authorization. 
const Find = ({ user, jwt }) => {
  const [users, setUsers] = useState([]); // useState array for listing all the users.

  useEffect(() => {
    // Fetch the list of users
    fetch('/listx', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        const filteredUsers = data.filter(u => u.email !== user.email); /// Excludes itself. 
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [user, jwt]); // Triggers again if user or jwt changes

  
  // handleLikeClick handles the front end logic of the like button.
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
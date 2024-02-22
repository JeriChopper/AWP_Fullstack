import React, { useState, useEffect } from 'react';

const MatchList = ({jwt}) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch the matches
    fetch('/matches', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            setMatches(data.matches);
        } else {
          console.error('Failed to fetch matches:', data.message);
        }
      })
      .catch(error => console.error('Error fetching matches:', error));
  }, [jwt]); // Trigger the effect when the jwt changes

  return (
    <div>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>{match.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, List, ListItem, Typography } from '@mui/material';

const MatchList = ({jwt, onSelectMatch}) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

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


  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
    if (onSelectMatch) {
      onSelectMatch(match);
    }
  };


return (
    <Card style={{ maxWidth: 500, position: 'fixed', top: 70, left: 0}}>
      <CardContent>
        <Typography variant="h6">Matches</Typography>
        <List>
          {matches.map((match) => (
            <ListItem key={match.id} onClick={() => handleMatchSelect(match)} button>
              <Card>
                <CardContent>
                  <Typography variant="body1">{match.email}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}


export default MatchList;
/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code




// Imports and dependencies
import React, { useState, useEffect } from 'react';
import { Card, CardContent, List, ListItem, Typography } from '@mui/material'; 

const MatchList = ({jwt, onSelectMatch}) => { /// use jwt as prop. onSelectMatch is prop from ActionAreaCard
  const [matches, setMatches] = useState([]); // Matces array
  const [selectMatch, setSelectedMatch] = useState(null);

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
            setMatches(data.matches); //put the matches in the array. 
        } else {
          console.error('Failed to fetch matches:', data.message);
        }
      })
      .catch(error => console.error('Error fetching matches:', error));
  }, [jwt]); // Trigger the effect when the jwt changes



  /// Logic to highlight specific match and the data behind it
  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
    if (onSelectMatch) {
      onSelectMatch(match);
    }
  };



  ///Returns a Card with mapped matched users based on their email 
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
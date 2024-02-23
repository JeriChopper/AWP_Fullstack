/// Jericho Koskinen
/// 0607024
/// Project started 14.2.2024
/// Sources and references will be linked near the code



import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { FaGrinHearts } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import IconButton from '@mui/material/IconButton';

export default function ActionAreaCard({user, onLikeClick}) { // take user and onLikeClick as a prop from Find page

  const handleLikeClick =  () => {
    onLikeClick(user.email);
  }; /// triggers the Like button click 



  /// SOURCE https://mui.com/material-ui/react-card/
  /// https://mui.com/material-ui/react-button/
   

  return (
    <Card sx={{ maxWidth: 345, margin: '16px' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.displayName || user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.bio || 'Looking to chat'}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ marginTop: '8px' }}>
            {user.gender || 'Gender not specified'}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <IconButton onClick={handleLikeClick}>
              <FaGrinHearts style={{ cursor: 'pointer' }} />
            </IconButton>
            <IconButton>
              <ImCross style={{ cursor: 'pointer' }} />
            </IconButton>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}



import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { FaGrinHearts } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function ActionAreaCard({user}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Etsin kavereita.
          </Typography>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '8px'}}>
            <FaGrinHearts style={{ cursor: 'pointer' }}/>
            <ImCross style={{ cursor: 'pointer' }} />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


/// SOURCE https://mui.com/material-ui/react-card/
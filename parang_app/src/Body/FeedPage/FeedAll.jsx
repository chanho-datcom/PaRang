import React from 'react';

import Box from '@mui/material/Box';


import Feed from './Feed';
import { Grid } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../config/API-Config';
import FeedWrite from './FeedWrite';


export default function FeedAll() {
  const [board, setBoard] = React.useState([]);
  const [checkBoard,setCheckBoard] = React.useState(true);
  React.useEffect(()=>{
  axios.get(API_BASE_URL + "/feedAll")
  .then((response) => {
    setBoard(response.data);
  }).catch(()=>{
    console.log("error")
  })

},[checkBoard])
  return (
    <div style={{ backgroundColor: '#e2e3e5' }}>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid mt={2} columnGap={2} >

      <FeedWrite/>
        {board.slice().reverse().map((item,idx)=>{
          return(
            <Feed key={idx} {...item} setCheckBoard = {setCheckBoard} checkBoard={checkBoard}/>
          )
        })}

      </Grid>
    </Box >
  </div>

  );
}

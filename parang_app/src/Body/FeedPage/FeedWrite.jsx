
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Box, Paper, TextField, Button } from '@mui/material';
import Prac from '../../Prac';
import axios from 'axios';
import { API_BASE_URL } from '../../config/API-Config';

export const FeedWrite = () => {
  const [expanded] = React.useState(false);
  // const [feedContent, setFeedContent] = useState("");



  const Feed =(FeedDTO)=>{
    axios({
      url : API_BASE_URL + "/feedAll/feedwrite",
      method: 'post',
      headers: { Authorization: localStorage.getItem("Authorization") },
      data: FeedDTO
    }).then((response)=>{
      console.log(FeedDTO)
      console.log(response)
    })
  }
  
  const FeedWriteAct = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const feedContent = data.get("feedContent");
    Feed({ feedContent: feedContent });
  }


  return (
    <Grid container>
      <Grid width={'70vw'} alignItems={'justify'}>
        <Card sx={{ width: '100%', height: '80vh' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                가입한사람 프로필사진
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="가입한사람 닉네임"
            subheader=" 게시글 작성한 날짜"
            />
            <form onSubmit={FeedWriteAct}>
          <Paper elevation={3} height={'60%'} padding={2}>
            <Box sx={{ height: '300px', padding: 2 }}>
                <Prac />
              <Typography variant="body2" color="text.secondary">
            <TextField
              variant='outlined'
              required
              fullWidth
              id='feedContent'
              name='feedContent'
              label="글 작성"
            >
          </TextField>
                <Button type='submit'> 작성완료</Button>
              </Typography>
            </Box>
          </Paper>
                </form>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  )
}


export default FeedWrite;
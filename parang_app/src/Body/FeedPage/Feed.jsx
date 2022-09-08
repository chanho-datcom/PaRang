import React from 'react';
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
import { Grid, Box, Paper, TextField, MenuItem, Tooltip, Menu } from '@mui/material';
import FeedService from './FeedService';
import FeedWrite from '../FeedPage/FeedWrite';
import { useNavigate } from "react-router-dom";
import { AvatarComponent } from '../../ComponentList/AvatarComponent';
import axios from 'axios';
import { API_BASE_URL } from '../../config/API-Config';
import { useState } from 'react';



export default function Feed() {
  const [expanded] = React.useState(false);
  const navigate = useNavigate();



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  //게시물 관련

  const [board, setBoard] = React.useState([]);
  const [boardTag, setBoardTag] = useState([]);
  React.useEffect(() => {
    axios.all([
      axios.get(API_BASE_URL+"/feedAll") 
    .then((response)=>{
      setBoard(response.data);
    }),
    axios.get(API_BASE_URL + "/tag/tagAll", {    
    }).then((response)=>{
      setBoardTag(response.data);
    })
  ])}, []);

  

  ////////////////////////////////////////


  return (
      <Grid container>
        <Grid width={'70vw'} alignItems={'justify'}>
          <FeedWrite />
          {board.reverse().map((item, idx) => { return <Card sx={{ width: '100%', height: '80vh' }}>

            <CardHeader
                // {/* 프로필 이미지  */}
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <AvatarComponent />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
              <IconButton aria-label="settings">
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <MenuItem >
                    <MenuItem value="Profile">수정하기</MenuItem>
                    <MenuItem value="Account">삭제하기</MenuItem>
                  </MenuItem>
                </Menu>
              </IconButton>
            
                  </IconButton>
                }
                title={item.boardWriterNickName}
                subheader= {item.CreatedDate}
            >
            </CardHeader>

            <Paper elevation={3} height={'60%'} padding={2}>
              <Box sx={{ height: '300px', padding: 2 }}>
                <Typography variant="body2" color="text.secondary">
                {/* <img src={item.boardImg} alt="img" />  */}
                  {item.boardContent}
                </Typography>
              </Box>
            </Paper>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            </Collapse>
            {/* 댓글 TextField */}
            <TextField
              variant='outlined'
              required
              fullWidth
              label="댓글 작성"
            >
          </TextField>
          </Card>})}
        </Grid>
      </Grid>
  );
}
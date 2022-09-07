
import React, { useRef, useState, Component } from 'react'
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
import { Grid, Box, Paper, TextField, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import Prac from '../../Prac';
import axios from 'axios';
import { API_BASE_URL } from '../../config/API-Config';
import { AvatarComponent } from '../../ComponentList/AvatarComponent';


export const FeedWrite = () => {

  const [expanded] = React.useState(false);

  const [userInfo, setUserInfo] = useState([]);
  React.useEffect(() => {
    axios.get(API_BASE_URL + "/user/mypage", {
      headers: { Authorization: localStorage.getItem("Authorization") },
    })
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch();
  }, []);


  const FeedWirteAxi = (feedData) => {
    axios({
      url: API_BASE_URL + "/feedAll/feedwrite",
      method: 'post',
      headers: { Authorization: localStorage.getItem("Authorization") },
      data: feedData
    }).then((response) => {
      console.log(response);
    })
  }

  const FeedWriteAct = (e) => {
    const data = new FormData(e.target);
    const feedContent = data.get("feedContent");
    console.log(feedContent);
    console.log(userInfo.userNickName);
    console.log(userInfo.userId);
    FeedWirteAxi({
      boardContent: feedContent,
      boardWriterNickName: userInfo.userNickName,
      boardWriterId: userInfo.userId
    });
  }


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);

  };


  const [input, setInput] = useState('');
  const [lists, setLists] = useState([]);
  const [nextId, setNextId] = useState(0);
  const inputName = useRef(null);
  
  const settinghHash = (e)=>{
    setInput(e.target.value);
  };

  const okHash = (e)=>{
    e.preventDefault();
    const about_lists = lists.concat({
      id: nextId,
      text : input
    });
    setNextId(nextId + 1 );
    console.log(nextId);

    setLists(about_lists);
    setInput('');
  }

  const input_list = lists.map((list)=>{
    <li
    key = {list.id}
    onDoubleClick={()=>removeList(list.id)}
    onClick={()=>modify(list.id)}
    >
      {list.text}
      </li>
  });

  const removeList =(id)=>{
    const about_lists = lists.filter((list)=> list.id !== id);
    setLists(about_lists);
  }

  const modify = (id)=>{
    lists.map((list)=>{
      if(list.id === id){
        inputName.current.focus();
        list.text = inputName.current.value;
      }
    });
    setLists(lists);
    setInput('');
  };


  return (
    <Grid container>
      <Grid width={'70vw'} alignItems={'justify'}>
        <Card sx={{ width: '100%', height: '80vh' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                <AvatarComponent />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                    <MenuItem value="Profile">Profile</MenuItem>
                    <MenuItem value="Account">Account</MenuItem>
                    <MenuItem value="Dashboard">Dashboard</MenuItem>
                  </MenuItem>
                </Menu>
              </IconButton>
            }
            title={userInfo.userNickName}
            subheader=" 게시글 작성한 날짜"
          />
          <form onSubmit={FeedWriteAct}>
            <Paper elevation={3} height={'60%'} padding={2}>
              <Box sx={{ height: '300px', padding: 2 }}>
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
                  <TextField
                    required
                    id="outlined-required"
                    name='boardCategory'
                    label="해시태그"
                  />
                  <form onSubmit={okHash}>
                  <TextField
                  name = "list"
                  type = "text"
                  placeholder='해시태그 작성하기'
                  value={input}
                  onChange={settinghHash}
                  ref={inputName}
                  />
                  <button onClick={okHash}>해시 추가</button>
                  </form>
                  <Button type='submit' onClick={FeedWriteAct}> 작성완료</Button>
               <ul>{input_list}</ul>ddd여긴오디
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
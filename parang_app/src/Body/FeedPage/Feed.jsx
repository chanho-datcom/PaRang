import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Box, Paper, TextField, MenuItem, Tooltip, Menu } from '@mui/material';
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
    setAnchorElUser(event.target);
  };
  //게시물 관련

  const [board, setBoard] = React.useState([]);
  const [boardTag, setBoardTag] = useState([]);
  React.useEffect(() => {
    axios.all([
      axios.get(API_BASE_URL + "/feedAll")
        .then((response) => {
          setBoard(response.data);
        }),
      axios.get(API_BASE_URL + "/tag/tagAll", {
      }).then((response) => {
        setBoardTag(response.data);

      })
    ])
  }, []);

  //더보기 버튼 액션
  const moreButtonAction = (e) => {
    console.log("함수실행")
    console.log(e.target.value)
    console.log(openOrClose)
    setOpenOrClose(!openOrClose)

  }

  const [openOrClose, setOpenOrClose] = useState(true);


  //글 별 태그 출력
  const tagPutter = (tag, item) => {
    if (item.tagIdentifier === tag.boardTagId) {
      return tag.boardTag
    }
  }

  ////////////////////////////////////////

  return (
    <Grid container>

      <Grid width={'70vw'} alignItems={'justify'}>
        {/* <FeedWrite /> */}
        {board.slice().reverse().map((item, idx) => {
          return <Card key={idx} sx={{ width: '100%', height: '80vh' }}>

            <CardHeader
              // {/* 프로필 이미지  */}
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <AvatarComponent />
                </Avatar>
              }

              // action={
              //   <IconButton onClick={handleOpenUserMenu}>
              //     <MoreVertIcon >
              //       <Menu

              //         sx={{ mt: '45px' }}
              //         id="menu-appbar"
              //         anchorEl={anchorElUser}
              //         anchorOrigin={{
              //           vertical: 'top',
              //           horizontal: 'right',
              //         }}
              //         keepMounted
              //         transformOrigin={{
              //           vertical: 'top',
              //           horizontal: 'right',
              //         }}
              //         open={Boolean(anchorElUser)}
              //       >
              //         <MenuItem value="updateBoard">수정하기</MenuItem>
              //         <MenuItem valeu="deleteBoard">삭제하기</MenuItem>
              //       </Menu>
              //     </MoreVertIcon>
              //   </IconButton>
              // }
              action={


                <IconButton onClick={handleOpenUserMenu} >
                  <MoreVertIcon />
                  <Menu
                    sx={{ mt: '45px' }}
                    name="logNavBar"
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
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem value="Profile">Profile</MenuItem>
                    <MenuItem value="Account">Account</MenuItem>
                    <MenuItem value="Dashboard">Dashboard</MenuItem>

                  </Menu>
                </IconButton>

              }
              title={item.boardWriterNickName}
              subheader={item.CreatedDate}
            >
            </CardHeader>

            <Paper elevation={3} height={'60%'} padding={2}>
              <Box sx={{ height: '20vh', padding: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {/* <img src={item.boardImg} alt="img" />  */}
                  {item.boardContent}
                </Typography>

                {boardTag.map((tag, tagIdentifier) => {
                  return (
                    <Typography key={tagIdentifier}>
                      {tagPutter(tag, item)}
                    </Typography>

                  )

                })}

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
          </Card>
        })}
      </Grid>
    </Grid>
  );
}
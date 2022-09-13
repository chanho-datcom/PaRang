
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Grid, Box, Paper, TextField, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../config/API-Config';
import { AvatarComponent } from '../../ComponentList/AvatarComponent';
import styled from 'styled-components'
import uuid from 'react-uuid';

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
  const FeedWriteAxi = (feedData) => {
    console.log(feedData.boardContent)

    axios.all([
      axios.post(API_BASE_URL + '/feedAll/feedwrite', {
        boardTitle: feedData.boardTitle,
        boardContent: feedData.boardContent,
        boardWriterNickName: feedData.boardWriterNickName,
        boardWriterId: feedData.boardWriterId,
        tagIdentifier: feedData.tagIdentifier
      }, {
        headers: { Authorization: localStorage.getItem("Authorization") }
      }),
      axios.post(API_BASE_URL + '/tag/create', {
        tagIdentifier: feedData.tagIdentifier,
        boardTag: feedData.boardTag
      }
        , {
          headers: { Authorization: localStorage.getItem("Authorization") }
        })
    ]).catch(() => {
      console.log("feedwrite작동안함")
    })
  }

  // const FeedWirteAxi = (feedData) => {
  //   axios({
  //     url: API_BASE_URL + "/feedAll/feedwrite",
  //     method: 'post',
  //     headers: { Authorization: localStorage.getItem("Authorization") },
  //     data: feedData
  //   }).then((response) => {
  //     console.log(response);
  //   })
  // }


  const FeedWriteAct = (e) => {
    let test = e.target
    const data = new FormData(document.getElementById('formData'));
    console.log(data)
    const boardTitle = data.get("boardTitle")
    const feedContent = data.get("feedContent");

    e.preventDefault();
    FeedWriteAxi({
      boardTitle: boardTitle,
      boardContent: feedContent,
      boardWriterNickName: userInfo.userNickName,
      boardWriterId: userInfo.userId,
      tagIdentifier: uuid(),
      boardTag: tagList
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



  /**
   * 카테고리
   */
  const [tagItem, setTagItem] = useState('')
  const [tagList, setTagList] = useState([])

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === ' ') {
      submitTagItem()

    }
  }

  const submitTagItem = () => {
    let updatedTagList = [...tagList]
    updatedTagList.push(tagItem.trim())
    setTagList(updatedTagList)
    setTagItem('')
    console.log(updatedTagList)
  }

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText
    const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem)
    setTagList(filteredTagList)
  }



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
            title={userInfo.userNickName}
            subheader=" 게시글 작성한 날짜"
          />
          <form onSubmit={FeedWriteAct} id="formData">
            <Paper elevation={3} height={'60%'} padding={2}>
              <Box sx={{ height: '300px', padding: 2 }}>

                <TextField
                  variant='standard'
                  required
                  fullWidth
                  id='standard-required'
                  name='boardTitle'
                  label="제목"
                >
                </TextField>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='feedContent'
                  label="글 작성"
                >
                </TextField>
                <WholeBox>

                  <TagBox>
                    {tagList.map((tagItem, index) => {
                      return (
                        <TagItem key={index}>
                          <Text>{tagItem}</Text>
                          <Button onClick={deleteTagItem}>취소</Button>
                        </TagItem>
                      )
                    })}
                    <TagInput
                      type='text'
                      placeholder='카테고리 입력'
                      name='hashTag'
                      tabIndex={2}
                      onChange={e => setTagItem(e.target.value)}
                      value={tagItem}
                      onKeyPress={onKeyPress}
                    />
                  </TagBox>
                </WholeBox>

              </Box>
              <Button type='submit' onClick={FeedWriteAct}> 작성완료</Button>
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

const WholeBox = styled.div`
  padding: 10px;
  height: 100vh;
`

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;

  &:focus-within {
    border-color: tomato;
  }
`

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: tomato;
  border-radius: 5px;
  color: white;
  font-size: 13px;
`

const Text = styled.span``



const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`


import React, { Component } from 'react';
import styled from 'styled-components';
import SegmentBar from './SegmentBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLyric, getComments, getSongDetail, getMusicUrl } from '../actions/app_action';
import Comment from './Comment';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 150px;
  padding: 20px;
`;

const SongContainer = styled.div`
  display: flex;
`;

const SongLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const SongPicContainer = styled.div`
  background-image: url(${require('../imgs/songpic-bg.png')});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SongPic = styled.div`
  border-radius: 50%;
  background-image: url(${props => props.picUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 220px;
  height: 220px;
`;

const SongRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const CommentContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const HostComments = styled.div``;

const NormalComments = styled.div``;

const Title = styled.div`
  border-bottom: 2px solid #e3e3e3;
  padding: 10px;
`;

class SongDetail extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    //get song detail
    this.props.dispatch(getSongDetail(id));
    //get song lyric
    this.props.dispatch(getLyric(id));
    //get comments
    this.props.dispatch(getComments(id));
    //get music url
    this.props.dispatch(getMusicUrl(id));
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  render() {
    const { lyric, hostComments, comments, song, musicUrl } = this.props.song;
    return (
      <Container>
        <SongContainer>
          <SongLeftContainer>
            <SongPicContainer>
              <SongPic picUrl={song.picUrl} />
            </SongPicContainer>
            <audio controls src={musicUrl} style={{marginTop: '15px'}}>
              你的浏览器不支持 audio 元素
            </audio>
          </SongLeftContainer>
          <SongRightContainer>
            <p style={{whiteSpace: 'pre'}}>{lyric}</p>
          </SongRightContainer>
        </SongContainer>
        <SegmentBar title={'评论'}/>
        <CommentContainer>
          <HostComments>
            <Title>
              精彩评论
            </Title>
            {hostComments.map((comment, index) => (
              <Comment key={comment.userId + index} comment={comment} />
            ))}
          </HostComments>
          <NormalComments>
            <Title>
              最新评论
            </Title>
            {comments.map((comment, index) => (
              <Comment key={comment.userId + index} comment={comment} />
            ))}
          </NormalComments>
        </CommentContainer>
      </Container>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  song: appReducer.currentSong
})

export default withRouter(connect(mapStateToProps)(SongDetail));

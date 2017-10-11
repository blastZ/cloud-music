import styled from 'styled-components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleSong from './SingleSong';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 64px;
  margin-top: 64px;
`;

const UserInfo = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-start;
`;

const RightContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const RightNameContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
  margin-bottom: 10px;
  & h3 {
    margin: 0px;
    font-size: 2em !important;
  }
`;

const RightActiveContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ActiveInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px 0 0;
  & p {
    margin: 0px;
  }
  & p strong {
    font-size: 24px;
  }
`;

const RightSignatureContainer = styled.div`
  & p {
    color: #666;
    font-size: 0.9em;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom: 2px solid #c20c0c;
  height: 30px;
  & h3 {
    margin: 0;
  }
`;

const MusicRecord = styled.div`
  margin-top: 43px;
`;

const PlayList = styled.div`
  margin-top: 36px;
  margin-bottom: 20px;
`;

const PlayListsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const PlayListContainer = styled.div`
  width: 200px;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 40px 20px;
  & img {
    width: 200px;
    height: 200px;
  }
  & img:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  & div {
    padding: 5px 0px;
  }
  & div:hover {
    cursor: pointer;
    color: orange;
  }
`;

class PersonalCenter extends Component {
  componentDidMount() {
    document.getElementsByTagName('html')[0].scrollTop = 0;
  }

  render() {
    const { name,avatarUrl,signature,birthday,city,
            follows,followeds,playlistCount,level } = this.props.user;
    return (
      <Container>
        <UserInfo>
          <LeftContainer>
            <img src={avatarUrl} style={{width: '188px', height: '188px', border: '1px solid #d5d5d5'}} />
          </LeftContainer>
          <RightContainer>
            <RightNameContainer>
              <h3>{name}</h3>
            </RightNameContainer>
            <RightActiveContainer>
              <ActiveInnerContainer>
                <p><strong>{follows}</strong></p>
                <p>关注</p>
              </ActiveInnerContainer>
              <ActiveInnerContainer>
                <p><strong>{followeds}</strong></p>
                <p>粉丝</p>
              </ActiveInnerContainer>
            </RightActiveContainer>
            <RightSignatureContainer>
              <p>个人介绍: {signature}</p>
              <p>{`所在地区: ${city}     年龄: ${birthday}`}</p>
            </RightSignatureContainer>
          </RightContainer>
        </UserInfo>
        <MusicRecord>
          <Title><h3>听歌排行</h3></Title>
          {this.props.recordList.map((song, index) => (
            <SingleSong song={{name: song.name, id: song.id, artists: song.ar, duration: song.dt}} index={index} />
          ))}
        </MusicRecord>
        <PlayList>
          <Title><h3>{`我创建的歌单( ${playlistCount} )`}</h3></Title>
          <PlayListsContainer>
            {this.props.personalPlayList.map((playlist) => (
              <PlayListContainer>
                <img onClick={() => this.props.history.push(`/playlist/${playlist.id}`)} src={playlist.picUrl} />
                <div onClick={() => this.props.history.push(`/playlist/${playlist.id}`)} >{playlist.name}</div>
              </PlayListContainer>
            ))}
          </PlayListsContainer>
        </PlayList>
      </Container>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  user: appReducer.personalUserDetail,
  recordList: appReducer.recordList,
  personalPlayList: appReducer.personalPlayList
})

export default withRouter(connect(mapStateToProps)(PersonalCenter));

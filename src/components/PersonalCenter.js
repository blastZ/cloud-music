import styled from 'styled-components';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class PersonalCenter extends Component {
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
        </MusicRecord>
        <PlayList>
          <Title><h3>{`我创建的歌单( ${playlistCount} )`}</h3></Title>
        </PlayList>
      </Container>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  user: appReducer.personalUserDetail
})

export default connect(mapStateToProps)(PersonalCenter);

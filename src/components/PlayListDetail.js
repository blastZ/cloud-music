import React, { Component } from 'react';
import styled from 'styled-components';
import SegmentBar from './SegmentBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlayListDetail } from '../actions/app_action';
import SingleSong from './SingleSong';
import Comment from './Comment';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 150px;
  padding: 20px;
`;

const PlayListContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 30%;
`;

const Image = styled.div`
  background-image: url(${props => props.picUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 250px;
  height: 250px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  justify-content: space-between;
`;

const Name = styled.div`
  & h2 {
    line-height: 24px;
    font-size: 20px;
    font-weight: normal;
  }
`;

const Artist = styled.div`
  display: flex;
  align-items: center;
  & img {
    width: 35px;
    height: 35px;
    margin: 0 8px;
  }
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  background: #C10D0C;
  color: white;
  font-weight: bold;
  font-size: 0.9em;
  padding: 6px;
  margin-left: 3px;
`;

const Description = styled.div`
  color: #666;
  font-size: 13px;
`;

const SongContainer = styled.div`
  padding-bottom: 64px;
`;


class PlayListDetail extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getPlayListDetail(id));
  }

  componentDidMount() {
    document.getElementsByTagName('html')[0].scrollTop = 0;
  }

  render() {
    const { creator, description, id, name, picUrl, tags, tracks } = this.props.playlist;
    return (
      <Container>
        <PlayListContainer>
          <LeftContainer>
            <Image picUrl={picUrl} />
          </LeftContainer>
          <RightContainer>
            <Name><h2>{name}</h2></Name>
            <Artist>
              <div>by </div>
              <img src={creator && creator.avatarUrl} />
              <div>{creator && creator.name}</div>
            </Artist>
            <Tags><span style={{marginRight: '5px', color: '#666'}}>标签 : </span>
              {tags && tags.map((tag, index) => (
                <Tag key={tag + index}>{tag}</Tag>
              ))}
            </Tags>
            <Description>介绍 : {description}</Description>
          </RightContainer>
        </PlayListContainer>
        <SegmentBar title={'歌曲列表'} style="full-width"/>
        <SongContainer>
          {
            tracks && tracks.map((track, index) => (
              <SingleSong song={{id: track.id, name: track.name, artists: track.ar, duration: track.dt}} index={index} />
            ))
          }
        </SongContainer>
      </Container>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  playlist: appReducer.currentPlayList
})

export default withRouter(connect(mapStateToProps)(PlayListDetail));

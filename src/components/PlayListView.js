import React, { Component } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SegmentBar from './SegmentBar';
import { getHotPlayList } from '../actions/app_action';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 108px;
  padding-bottom: 64px;
`;

const PlayListUL = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const PlayList = styled.li`
  width: 45%;
  padding: 0 0 45px 20px;
  display: flex;
`;

const LeftContainer = styled.div`
  & img {
    width: 164px;
    height: 164px;
  }
  & img:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const RightContainer = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Name = styled.div`
  &:hover {
    color: orange;
    cursor: pointer;
  }
`;

const Creator = styled.div`
  color: #999;
  font-size: 0.9em;
  padding: 5px 0px;
  &:hover {
    color: #C10D0C;
    cursor: pointer;
  }
`;

const Tags = styled.div`
  display: flex;
`;

const Tag = styled.div`
  background: #C10D0C;
  color: white;
  font-weight: bold;
  font-size: 0.9em;
  padding: 6px;
  margin-left: 3px;
`;

const PlayCount = styled.div`
  font-size: 0.9em;
  color: #999;
`;

class PlayListView extends Component {
  componentDidMount() {
    this.props.dispatch(getHotPlayList());
  }

  render() {
    return (
      <Container>
        <SegmentBar title="热门歌单" />
        <PlayListUL>
          {this.props.hotPlayList.map((playlist) => (
            <PlayList>
              <LeftContainer>
                <img src={playlist.picUrl} />
              </LeftContainer>
              <RightContainer>
                <Name>{playlist.name}</Name>
                <Creator>{`by ${playlist.creator.name}`}</Creator>
                <p style={{margin: '5px 0px', fontSize: '0.9em'}}>标签:</p>
                <Tags>
                  {playlist.tags.map((tag) => (
                    <Tag>{tag}</Tag>
                  ))}
                </Tags>
                <PlayCount>{`播放次数: ${playlist.playCount}`}</PlayCount>
              </RightContainer>
            </PlayList>
          ))}
        </PlayListUL>
      </Container>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  hotPlayList: appReducer.hotPlayList
})

export default withRouter(connect(mapStateToProps)(PlayListView));

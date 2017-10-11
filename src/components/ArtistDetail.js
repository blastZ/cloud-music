import React, { Component } from 'react';
import styled from 'styled-components';
import SegmentBar from './SegmentBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getArtistDetail } from '../actions/app_action';

const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  margin-top: 90px;
  padding: 20px;
`;

const Name = styled.div`
  display: flex;
  align-items: flex-end;
  & h2 {
    margin: 0;
    color: #333;
    height: 34px;
    line-height: 24px;
    font-weight: normal;
    font-size: 24px;
  }
  & h3 {
    margin: 0;
    padding-left: 10px;
    font-size: 14px;
    line-height: 32px;
    color: #999;
    font-weight: normal;
  }
`;

const Image = styled.div`
  width: 900px;
  height: 400px;
  background: url(${props => props.picUrl});
  background-size: cover;
  background-position-y: -113px;
  background-repeat: no-repeat;
  margin: 0 auto;
`;

const BriefDesc = styled.div`
  border-left: 4px solid #C10D0C;
  margin-top: 5px;
  padding-left: 5px;
  margin-bottom: 30px;
`;

const HotSongs = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 410px;
  overflow-x: auto;
  margin-bottom: 64px;
`;

const Song = styled.div`
  display: flex;
  padding: 0 20px 20px 20px;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;

class ArtistDetail extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getArtistDetail(id));
  }

  componentDidMount() {
    document.getElementsByTagName('html')[0].scrollTop = 0;
  }

  render() {
    const { name, alias, picUrl, briefDesc, hotSongs } = this.props.artist;
    return (
      <Container>
        <Name>
          <h2>{name}</h2>
          <h3>{alias}</h3>
        </Name>
        <Image picUrl={picUrl} />
        <BriefDesc>{briefDesc}</BriefDesc>
        <SegmentBar title="热门50单曲"  style='full-width' />
        <HotSongs>
          {hotSongs && hotSongs.map((song) => (
            <Song onClick={() => this.props.history.push(`/song/${song.id}`)} key={song.id + song.name}>{song.name}</Song>
          ))}
        </HotSongs>
      </Container>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  artist: appReducer.currentArtist
})

export default withRouter(connect(mapStateToProps)(ArtistDetail));

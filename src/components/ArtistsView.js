import React, { Component } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SegmentBar from './SegmentBar';
import { getHotArtists } from '../actions/app_action';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 108px;
  padding-bottom: 64px;
`;

const ArtistsList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const Artist = styled.li`
  width: 130px;
  height: 154px;
  padding: 0 0 30px 50px;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 130px;
    height: 130px;
  }
  & img:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  & p {
    margin: 0;
    margin-top: 10px;
  }
  & p:hover {
    cursor: pointer;
    color: orange;
    border-bottom: 1px solid orange;
  }
`;

class ArtistsView extends Component {
  componentDidMount() {
    this.props.dispatch(getHotArtists());
  }

  render() {
    return (
      <Container>
        <SegmentBar title="热门歌手" />
        <ArtistsList>
          {this.props.hotArtistsList.map((artist, index) => (
            <Artist key={artist.id + artist.name}>
              <img src={artist.picUrl} />
              <p>{artist.name}</p>
            </Artist>
          ))}
        </ArtistsList>
      </Container>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  hotArtistsList: appReducer.hotArtistsList
})

export default withRouter(connect(mapStateToProps)(ArtistsView));

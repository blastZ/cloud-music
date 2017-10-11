import React, { Component } from 'react';
import styled from 'styled-components';
import { getSearchResult } from '../actions/app_action';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-left: 20px;
  & p {
    margin: 10px 0px;
    white-space: nowrap;
  }
`;

const MusicLinkContainer = styled.div`
  width: 60%;
  display: flex;
`;

const MusicLink = styled.p`
  margin: 0;
  padding-right: 15px;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;

const Artist = styled.p`
  width: 20%;
`;

class SingleSong extends Component {
  render() {
    const { song, index } = this.props;
    return (
      <Container style={{background: `${index % 2 === 0 ? 'white' : '#f7f7f7'}`}}>
        <MusicLinkContainer><MusicLink onClick={() => this.props.history.push(`/song/${song.id}`)}>{song.name}</MusicLink></MusicLinkContainer>
        <Artist>{song.artists[0].name}</Artist>
        <p>{song.duration}</p>
      </Container>
    )
  }
}

export default withRouter(connect()(SingleSong));

import React, { Component } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  background-image: url(${props => props.picUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 300px;
  height: 300px;
  margin: 10px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  padding: 5px 0px 0px 10px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.5);
  transition: ${props => props.showText ? 'opacity 1.3s ease, transform 0.6s ease' : 'opacity 0.3s ease, transform 0.5s ease'};
  opacity: ${props => props.showText ? 1 : 0};
  transform: ${props => props.showText ? 'translateY(0)' : 'translateY(100px)'};
`;

const Song = styled.div`
  font-size: 1.2em;
  border-left: 3px solid #C10D0C;
  padding-left: 5px;
  font-weight: bold;
`;

const Artists = styled.div`
  margin: 0px;
  font-size: 1em;
  padding-left: 10px;
  font-weight: bold;
`;

class MusicCard extends Component {
  state = {
    showText: false
  }

  shouldShowText = () => {
    this.setState({showText: !this.state.showText});
  }

  toSongDetail = () => {
    this.props.history.push(`/song/${this.props.song.id}`);
  }

  render() {
    const { name, picUrl, artists } = this.props.song;
    return (
      <Container picUrl={picUrl} onMouseEnter={this.shouldShowText} onMouseLeave={this.shouldShowText} onClick={this.toSongDetail}>
        <TextContainer showText={this.state.showText}>
          <Song>{`${name} - ${artists.map((artist) => (`${artist.name}`))}`}</Song>
        </TextContainer>
      </Container>
    )
  }
}

export default withRouter(MusicCard);

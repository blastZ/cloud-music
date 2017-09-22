import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-image: url(${props => props.picUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 300px;
  height: 300px;
  margin: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default class MusicCard extends Component {
  render() {
    return (
      <Container picUrl={this.props.picUrl} />
    )
  }
}

import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  background: rgba(255,255,255,0.5);
  border: none;
  border-radius: 5px;
  width: 50%;
  font-size: 2em;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default class SearchBar extends Component {
  render() {
    return (
      <Container>
        <Input />
      </Container>
    )
  }
}

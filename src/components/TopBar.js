import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from 'react-icons/lib/md/library-music';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0px;
  width: 100%;
  background: rgba(0,0,0,0.5);
  left: 0px;
  height: 4em;
  padding-left: 1em;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 2em;
`;

const Text = styled.p`
  color: white;
  font-size: 1.3em;
  font-weight: bold;
`;

const LoginButton = styled.button`
  color: white;
  background: transparent;
  border: none;
  font-size: 1.3em;
  outline: none;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;

export default class TopBar extends Component {
  render() {
    return (
      <Container>
        <LeftContainer>
          <Logo style={{color: 'orange', fontSize: '2.5em', marginRight: '10px'}} />
          <Text>
            CLOUD MUSIC
          </Text>
        </LeftContainer>
        <RightContainer>
          <LoginButton>
            Login
          </LoginButton>
        </RightContainer>
      </Container>
    )
  }
}

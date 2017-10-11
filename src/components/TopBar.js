import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from 'react-icons/lib/md/library-music';
import UserIcon from 'react-icons/lib/fa/user';
import { connect } from 'react-redux';
import { loginWithPhone } from '../actions/app_action';
import LoginView from './LoginView';
import { shouldShowLoginView } from '../actions/popups_action';
import { withRouter, Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0px;
  width: 100%;
  background: rgba(0,0,0,0.6);
  z-index: 200;
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
  font-size: 15px;
  outline: none;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;

const NavList = styled.ul`
  color: white;
  display: flex;
  align-items: center;
  font-size: 15px;
  list-style: none;
  & li {
    margin-left: 45px;
  }
  & li:hover {
    cursor: pointer;
    color: orange;
  }
`;

class TopBar extends Component {
  render() {
    return (
      <Container>
        <LeftContainer>
          <Logo style={{color: 'orange', fontSize: '2.5em', marginRight: '10px'}} />
          <Text>
            CLOUD MUSIC
          </Text>
          <NavList>
            <li onClick={() => this.props.history.push('/')} style={{marginLeft: '20px'}}>主页</li>
            <li>歌手</li>
            <li>歌单</li>
            <li>电台</li>
          </NavList>
        </LeftContainer>
        <RightContainer>
          <UserIcon style={{color: 'orange', fontSize: '18px'}}/>
          {
            this.props.login
            ? <LoginButton onClick={() => this.props.history.push('/user/home')}>
              {this.props.user.name}
            </LoginButton>
            : <LoginButton onClick={() => this.props.dispatch(shouldShowLoginView())}>
              Login
            </LoginButton>
          }
        </RightContainer>
      </Container>
    )
  }
}

const mapStateToProps = ({appReducer}) => ({
  login: appReducer.login,
  user: appReducer.personalUserDetail
})

export default withRouter(connect(mapStateToProps)(TopBar));

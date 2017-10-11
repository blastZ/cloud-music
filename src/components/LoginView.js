import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { shouldShowLoginView } from '../actions/popups_action';
import { loginWithPhone } from '../actions/app_action';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: transparent;
  left: 0;
  top: 0;
  z-index: 2000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 530px;
  border-radius: 5px 5px 4px 4px;
  box-shadow: 0 5px 16px rgba(0,0,0,0.8);
  border: none;
  background: #fff;
`;

const Title = styled.div`
  line-height: 30px;
  background: #2d2d2d;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid #191919;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 10px;
  color: white;
  position: relative;
`;

const CloseButton = styled.span`
  position: absolute;
  right: 15px;
  color: white;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;

const Middle = styled.div`
  width: 220px;
  margin: 0 auto;
  padding: 30px 0 43px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bottom = styled.div`

`;

const Input = styled.input`
  width: 100%;
  padding: 5px 8px 5px;
  margin: 8px 0;
  border: 1px solid #cdcdcd;
  border-radius: 2px;
  line-height: 30px;
`;

const LoginButton = styled.button`
  background: orange;
  color: white;
  border: none;
  width: 100%;
  height: 32px;
  font-weight: bold;
  letter-spacing: 14px;
  outline: none;
  margin-top: 10px;
  &:hover {
    opacity: 0.8;
    cursor: pointer !important;
  }
`;

const ErrorMessage = styled.div`
  color: #e33232;
  font-size: 0.7em;
`;

class LoginView extends Component {
  state = {
    errorMessage: '',
    phone: '',
    password: ''
  }

  verifyLogin = () => {
    const reg = /^[1][0-9]{10}$/;
    if(!reg.test(this.state.phone)) {
      if(this.state.phone === '') {
        this.setState({
          errorMessage: '手机号不能为空'
        })
      } else {
        this.setState({
          errorMessage: '请输入正确的手机号'
        })
      }
    } else {
      if(this.state.password === '') {
        this.setState({
          errorMessage: '密码不能为空'
        })
      } else {
        fetch(`http://localhost:5001/login/cellphone?phone=${this.state.phone}&password=${this.state.password}`)
          .then((response) => (response.json()))
          .then((result) => {
            console.log(result)
            if(result.code !== 200) {
              this.setState({
                errorMessage: '用户名或密码错误'
              })
            } else {
              this.props.dispatch(shouldShowLoginView());
              const userId = result.account.id;
              this.props.dispatch(loginWithPhone(userId));
            }
          })
      }
    }
  }

  handlePhone = (e) => {
    const phone = e.target.value;
    this.setState({
      phone
    })
  }

  handlePassWord = (e) => {
    const password = e.target.value;
    this.setState({
      password
    })
  }

  render() {
    return (
      <Container>
        <InnerContainer>
          <Title>手机号登录<CloseButton onClick={() => this.props.dispatch(shouldShowLoginView())}>X</CloseButton></Title>
          <Middle>
            <Input value={this.state.phone} onChange={this.handlePhone} placeholder="请输入手机号" />
            <Input type="password" value={this.state.password} onChange={this.handlePassWord} placeholder="请输入密码" />
            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
            <LoginButton onClick={this.verifyLogin}>
              登录
            </LoginButton>
          </Middle>
          <Bottom>
          </Bottom>
        </InnerContainer>
      </Container>
    )
  }
}

export default connect()(LoginView);

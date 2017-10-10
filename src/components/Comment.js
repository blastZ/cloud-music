import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFormatedTime } from '../utils/helpers.js';

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 0;
  border-bottom: 1px dotted #ccc;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightContainer = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
`;

const Content = styled.p`
  margin: 0;
  font-size: 0.8em;
`;

const Information = styled.div`
  margin-top: 15px;
  width: 100%;
  font-size: 0.8em;
  display: flex;
  justify-content: space-between;
`;

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <Container>
        <LeftContainer>
          <Avatar src={comment.avatarUrl} />
        </LeftContainer>
        <RightContainer>
          <Content>
            <span style={{color: '#0c73c2'}}>{`${comment.nickname} : `}</span>
            <span>{comment.content}</span>
          </Content>
          <Information>
            <div style={{color: '#999'}}>{getFormatedTime(comment.time)}</div>
            <div>{comment.likedCount}</div>
          </Information>
        </RightContainer>
      </Container>
    )
  }
}

export default withRouter(Comment);

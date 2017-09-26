import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <p>{comment.nickname}</p>
    )
  }
}

export default withRouter(Comment);

import React, { Component } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SegmentBar from './SegmentBar';

class ArtistsView extends Component {

  render() {
    return (
      <Container picUrl={picUrl}>
        <SegmentBar title="热门歌手" />
      </Container>
    )
  }
}

export default withRouter(connect()(MusicCard));

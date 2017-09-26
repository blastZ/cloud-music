import React, { Component } from 'react';
import styled from 'styled-components';
import TitleIcon from 'react-icons/lib/md/adjust';

const Container = styled.div`
  width: 90% !important;
  margin: 0 auto;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.p`
  font-size: 1.5em;
`;

const Bar = styled.div`
  height: 2px;
  background: #C10D0C;
`;

export default class SegmentBar extends Component {
  render() {
    return (
      <Container>
        <Row>
          <TitleIcon style={{color: '#C10D0C', fontSize: '1.5em', marginRight: '10px'}} />
          <Title>
            {this.props.title}
          </Title>
        </Row>
        <Bar />
      </Container>
    )
  }
}

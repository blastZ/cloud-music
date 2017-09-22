import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecNewSongs, getRank } from '../actions/app_action';
import SearchBar from './SearchBar';
import TopBar from './TopBar';
import styled from 'styled-components';
import MusicCard from './MusicCard';
import Rank from './Rank';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${require('../imgs/bg.jpg')});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const MusicContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const RankContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getRecNewSongs());
  }
  render() {
    const { recNewSongs } = this.props;
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Container>
          <TopBar />
          <SearchBar />
        </Container>
        <MusicContainer>
          {
            recNewSongs.map((son) => (
              <MusicCard
                key={son.id}
                name={son.name}
                picUrl={son.picUrl}/>
            ))
          }
        </MusicContainer>
        <RankContainer>
          <Rank id={0} />
          <Rank id={1} />
          <Rank id={2} />
          <Rank id={3} />
        </RankContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  recNewSongs: appReducer.recNewSongs
})

export default connect(mapStateToProps)(App);

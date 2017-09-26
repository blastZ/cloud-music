import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecNewSongs, getRank } from '../actions/app_action';
import SearchBar from './SearchBar';
import TopBar from './TopBar';
import styled from 'styled-components';
import MusicCard from './MusicCard';
import Rank from './Rank';
import SegmentBar from './SegmentBar';
import { Switch, Route, withRouter } from 'react-router-dom';
import SongDetail from './SongDetail';
import LeftImageIcon from 'react-icons/lib/fa/angle-left';
import RightImageIcon from 'react-icons/lib/fa/angle-right';

const OutContainer = styled.div`
  width: 100%;
  height: 100%;
`;


const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  transition: background-image 1.5s ease;
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
  state = {
    backgroundImgList: [
      require('../imgs/bg.jpg'),
      require('../imgs/bg2.jpg'),
      require('../imgs/bg3.jpg'),
    ],
    bgIndex: 0
  }

  increaseBgIndex = () => {
    this.setState({
      bgIndex: this.state.bgIndex + 1 >= this.state.backgroundImgList.length ? 0 : this.state.bgIndex + 1
    })
  }

  decreaseBgIndex = () => {
    this.setState({
      bgIndex: this.state.bgIndex - 1 < 0 ? this.state.backgroundImgList.length - 1 : this.state.bgIndex - 1
    })
  }

  componentDidMount() {
    this.props.dispatch(getRecNewSongs());
  }

  render() {
    const { recNewSongs } = this.props;
    return (
        <Switch>
          <Route exact path="/" render={() => (
            <OutContainer>
              <Container bgImg={this.state.backgroundImgList[this.state.bgIndex]}>
                <LeftImageIcon onClick={this.decreaseBgIndex} className="left-img-icon"/>
                <TopBar />
                <SearchBar />
                <RightImageIcon onClick={this.increaseBgIndex} className="right-img-icon"/>
              </Container>
              <SegmentBar title={'热门推荐'} />
              <MusicContainer>
                {
                  recNewSongs.map((song) => (
                    <MusicCard
                      key={song.id}
                      song={song}/>
                  ))
                }
              </MusicContainer>
              <SegmentBar title={'榜单'} />
              <RankContainer>
                <Rank id={0} />
                <Rank id={1} />
                <Rank id={2} />
                <Rank id={3} />
              </RankContainer>
            </OutContainer>
          )} />
          <Route exact path="/song/:id" render={() => (
            <OutContainer>
              <TopBar />
              <SongDetail />
            </OutContainer>
          )} />
        </Switch>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  recNewSongs: appReducer.recNewSongs
})

export default withRouter(connect(mapStateToProps)(App));

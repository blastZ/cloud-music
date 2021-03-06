import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecNewSongs } from '../actions/app_action';
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
import PersonalCenter from './PersonalCenter';
import LoginView from './LoginView';
import SearchView from './SearchView';
import ArtistsView from './ArtistsView';
import PlayListView from './PlayListView';
import ArtistDetail from './ArtistDetail';
import PlayListDetail from './PlayListDetail';

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
  width: 85%;
  display: flex;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: space-between;
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
    bgIndex: 0,
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
    document.getElementsByTagName('html')[0].scrollTop = 0;
    setInterval(() => {
      this.increaseBgIndex();
    }, 5000);
  }

  render() {
    const { recNewSongs } = this.props;
    return (
        <OutContainer>
          { this.props.showLoginView && <LoginView /> }
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
                <RankContainer style={{paddingBottom: '64px'}}>
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
            <Route exact path="/artist/:id" render={() => (
              <OutContainer>
                <TopBar />
                <ArtistDetail />
              </OutContainer>
            )} />
            <Route exact path="/playlist/:id" render={() => (
              <OutContainer>
                <TopBar />
                <PlayListDetail />
              </OutContainer>
            )} />
            <Route exact path="/user/home" render={() => (
              <OutContainer>
                <TopBar />
                <PersonalCenter />
              </OutContainer>
            )} />
            <Route exact path="/search" render={() => (
              <OutContainer>
                <TopBar />
                <SearchView />
              </OutContainer>
            )} />
            <Route exact path="/discover/artist" render={() => (
              <OutContainer>
                <TopBar />
                <ArtistsView />
              </OutContainer>
            )} />
            <Route exact path="/discover/playlist" render={() => (
              <OutContainer>
                <TopBar />
                <PlayListView />
              </OutContainer>
            )} />
          </Switch>
        </OutContainer>
    );
  }
}

const mapStateToProps = ({ appReducer, popupsReducer }) => ({
  recNewSongs: appReducer.recNewSongs,
  showLoginView: popupsReducer.showLoginView
})

export default withRouter(connect(mapStateToProps)(App));

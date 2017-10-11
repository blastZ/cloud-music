import React, { Component } from 'react';
import styled from 'styled-components';
import { getSearchResult } from '../actions/app_action';
import { connect } from 'react-redux';
import SingleSong from './SingleSong';

const Container = styled.div`
  width: 980px;
  margin: 0 auto;
  margin-top: 128px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  margin-top: 64px;
  padding-left: 25px;
  padding-bottom: 5px;
  font-weight: bold;
  border-bottom: 2px solid #C10D0C;
`;

const SearchContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const SearchBar = styled.input`
  width: 320px;
  height: 30px;
  outline: none;
  border-radius: 8px;
  padding: 5px 10px;
  border: 1px solid #e3e3e3;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 128px;
`;

const NavContainer = styled.div`
  height: 32px;
`;

class SearchView extends Component {
  state = {
    keywords: ''
  }

  handleKeywords = (e) => {
    this.setState({
      keywords: e.target.value
    })
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.props.dispatch(getSearchResult(this.state.keywords));
    }
  }

  render() {
    return (
      <Container>
        <SearchContainer>
          <SearchBar value={this.state.keywords} onChange={this.handleKeywords} onKeyPress={this.handleKeyPress} />
        </SearchContainer>
        <Title>
          <div style={{width: '60%'}}>单曲</div>
          <div style={{width: '20%'}}>歌手</div>
          <div style={{width: '20%'}}>时长</div>
        </Title>
        <ContentContainer>
          {this.props.searchResultList.map((song, index) => (
            <SingleSong key={song.id + song.name} song={song} index={index}/>
          ))}
        </ContentContainer>
        <NavContainer />
      </Container>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  searchResultList: appReducer.searchResultList
})

export default connect(mapStateToProps)(SearchView);

import React, { Component } from 'react';
import styled from 'styled-components';
import { getRank } from '../actions/app_action';
import { connect } from 'react-redux';

const RankList = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RankItem = styled.div`
  display: flex;
  align-items: center;
  width: 280px;
  border-bottom: 1px solid #e3e3e3;
  & p {
    margin: 10px 0px;
    white-space: nowrap;
  }
`;

class Rank extends Component {
  state = {
    ranksName: [
      '云音乐新歌榜',
      '云音乐热歌榜',
      '网易原创歌曲榜',
      '云音乐飙升榜',
      '云音乐电音榜',
    ]
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.dispatch(getRank(id))
  }
  render() {
    const { ranks, id } = this.props;
    return (
      <RankList>
        <h3>{this.state.ranksName[id]}</h3>
        {ranks[id] && ranks[id].map((song, index) => (
          <RankItem key={song.id}>
            <p style={{color: `${index < 3 ? 'red' : 'black'}`, marginRight: '10px'}}>{index + 1}</p>
            <p>{song.name}</p>
          </RankItem>
        ))}
      </RankList>
    )
  }
}

const mapStateToProps = ({appReducer}) => ({
  ranks: appReducer.ranks
})

export default connect(mapStateToProps)(Rank);

import { GET_REC_NEW_SONS, GET_RANK } from '../actions/app_action';

const initState = {
  recNewSongs: [],
  ranks: {}
}

const appReducer = (state=initState, action) => {
  const { recNewSongs, ranks } = action;
  switch (action.type) {
    case GET_REC_NEW_SONS: {
      return {
        ...state,
        recNewSongs
      }
    }
    case GET_RANK: {
      return {
        ...state,
        ranks: {
          ...state.ranks,
          ...ranks
        }
      }
    }
    default: return state;
  }
}

export default appReducer;

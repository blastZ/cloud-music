import { GET_REC_NEW_SONS, GET_RANK, GET_LYRIC,
         GET_COMMENTS, GET_SONG_DETAIL, GET_MUSIC_URL,
         LOGIN_WITH_PHONE, GET_PLAY_RECORD } from '../actions/app_action';

const initState = {
  recNewSongs: [],
  ranks: {},
  currentSong: {
    song: {},
    lyric: [],
    hostComments: [],
    comments: [],
    musicUrl: ''
  },
  personalUserDetail: {},
  recordList: [],
}

const appReducer = (state=initState, action) => {
  const { recNewSongs, ranks, lyric, hostComments, comments, song, musicUrl,
          personalUserDetail, recordList } = action;
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
    case GET_LYRIC: {
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          lyric
        }
      }
    }
    case GET_COMMENTS: {
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          hostComments,
          comments
        }
      }
    }
    case GET_SONG_DETAIL: {
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          song
        }
      }
    }
    case GET_MUSIC_URL: {
      return {
        ...state,
        currentSong: {
          ...state.currentSong,
          musicUrl
        }
      }
    }
    case LOGIN_WITH_PHONE: {
      return {
        ...state,
        personalUserDetail
      }
    }
    case GET_PLAY_RECORD: {
      return {
        ...state,
        recordList
      }
    }
    default: return state;
  }
}

export default appReducer;

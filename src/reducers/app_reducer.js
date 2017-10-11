import { GET_REC_NEW_SONS, GET_RANK, GET_LYRIC,
         GET_COMMENTS, GET_SONG_DETAIL, GET_MUSIC_URL,
         LOGIN_WITH_PHONE, GET_PLAY_RECORD, GET_SEARCH_RESULT,
         GET_HOT_ARTISTS, GET_HOT_PLAY_LIST, GET_ARTIST_DETAIL,
         GET_PLAY_LIST_DETAIL, GET_PERSONAL_PLAY_LIST } from '../actions/app_action';

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
  currentArtist: {}, //286
  currentPlayList: {}, //331
  personalUserDetail: {},
  recordList: [],
  login: false,
  searchResultList: [], // {id: 11, name: 'aa', artists: [], duration: 111}
  hotArtistsList: [], // {name: 'aa', id: 123, picUrl: 'http://faf'}
  hotPlayList: [], // 260
  personalPlayList: [], // 358
}

const appReducer = (state=initState, action) => {
  const { recNewSongs, ranks, lyric, hostComments, comments, song, musicUrl,
          personalUserDetail, recordList, searchResultList, hotArtistsList,
          hotPlayList, currentArtist, currentPlayList, personalPlayList } = action;
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
        personalUserDetail,
        login: true
      }
    }
    case GET_PLAY_RECORD: {
      return {
        ...state,
        recordList
      }
    }
    case GET_SEARCH_RESULT: {
      return {
        ...state,
        searchResultList
      }
    }
    case GET_HOT_ARTISTS: {
      return {
        ...state,
        hotArtistsList
      }
    }
    case GET_HOT_PLAY_LIST: {
      return {
        ...state,
        hotPlayList
      }
    }
    case GET_ARTIST_DETAIL: {
      return {
        ...state,
        currentArtist
      }
    }
    case GET_PLAY_LIST_DETAIL: {
      return {
        ...state,
        currentPlayList
      }
    }
    case GET_PERSONAL_PLAY_LIST: {
      return {
        ...state,
        personalPlayList
      }
    }
    default: return state;
  }
}

export default appReducer;

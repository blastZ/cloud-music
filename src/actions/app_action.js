export const GET_REC_NEW_SONS = 'GET_REC_NEW_SONS';
export const GET_RANK = 'GET_RANK';
export const GET_LYRIC = 'GET_LYRIC';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_SONG_DETAIL = 'GET_SONG_DETAIL';
export const GET_MUSIC_URL = 'GET_MUSIC_URL';
export const LOGIN_WITH_PHONE = 'LOGIN_WITH_PHONE';
export const GET_USER_DETAIL = 'GET_USER_DETAIL';
export const GET_PLAY_RECORD = 'GET_PLAY_RECORD';
export const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT';
export const GET_HOT_ARTISTS = 'GET_HOT_ARTISTS';
export const GET_HOT_PLAY_LIST = 'GET_HOT_PLAY_LIST';
export const GET_ARTIST_DETAIL = 'GET_ARTIST_DETAIL';
export const GET_PLAY_LIST_DETAIL = 'GET_PLAY_LIST_DETAIL';
export const GET_PERSONAL_PLAY_LIST = 'GET_PERSONAL_PLAY_LIST';

export const getRecNewSongs = () => ({
  type: GET_REC_NEW_SONS
})

export const getRank = (id) => ({
  type: GET_RANK,
  id
})

export const getLyric = (id) => ({
  type: GET_LYRIC,
  id
})

export const getComments = (id) => ({
  type: GET_COMMENTS,
  id
})

export const getSongDetail = (id) => ({
  type: GET_SONG_DETAIL,
  id
})

export const getMusicUrl = (id) => ({
  type: GET_MUSIC_URL,
  id
})

export const loginWithPhone = (userId) => ({
  type: LOGIN_WITH_PHONE,
  userId
})

export const getUserDetail = (id) => ({
  type: GET_USER_DETAIL,
  id
})

export const getPlayRecord = (id) => ({
  type: GET_PLAY_RECORD,
  id
})

export const getSearchResult = (keywords) => ({
  type: GET_SEARCH_RESULT,
  keywords
})

export const getHotArtists = () => ({
  type: GET_HOT_ARTISTS
})

export const getHotPlayList = () => ({
  type: GET_HOT_PLAY_LIST
})

export const getArtistDetail = (id) => ({
  type: GET_ARTIST_DETAIL,
  id
})

export const getPlayListDetail = (id) => ({
  type: GET_PLAY_LIST_DETAIL,
  id
})

export const getPersonalPlayList = (id) => ({
  type: GET_PERSONAL_PLAY_LIST,
  id
})

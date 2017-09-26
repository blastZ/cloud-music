export const GET_REC_NEW_SONS = 'GET_REC_NEW_SONS';
export const GET_RANK = 'GET_RANK';
export const GET_LYRIC = 'GET_LYRIC';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_SONG_DETAIL = 'GET_SONG_DETAIL';
export const GET_MUSIC_URL = 'GET_MUSIC_URL';

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

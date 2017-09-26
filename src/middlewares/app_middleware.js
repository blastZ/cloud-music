import { GET_REC_NEW_SONS, GET_RANK, GET_LYRIC, GET_COMMENTS,
         GET_SONG_DETAIL, GET_MUSIC_URL} from '../actions/app_action';

const url = 'http://localhost:5001';

const appMiddleware = store => next => action => {
  if(action.type === GET_REC_NEW_SONS) {
    fetch(`${url}/personalized/newsong`)
      .then((response) => (response.json()))
      .then(({ result }) => {
        const recNewSongs = [];
        result.map(({song}) => {
          recNewSongs.push({
            id: song.id,
            name: song.name,
            artists: song.artists,
          })
        })
        for(let i=0; i<recNewSongs.length; i++) {
          const { id } = recNewSongs[i];
          fetch(`${url}/song/detail?ids=${id}`)
            .then((response) => (response.json()))
            .then((result) => {
              const picUrl = result.songs[0].al.picUrl;
              recNewSongs[i].picUrl = picUrl;
              if(i === recNewSongs.length - 1) {
                next({
                  type: GET_REC_NEW_SONS,
                  recNewSongs
                })
              }
            })
        }
      })
  } else if(action.type === GET_RANK) {
    const { id } = action;
    fetch(`${url}/top/list?idx=${id}`)
      .then((response) => (response.json()))
      .then((result) => {
        const tracks = result.result.tracks.slice(0, 10);
        const songs = []
        tracks.map((track) => {
          songs.push({
            id: track.id,
            name: track.name
          })
        })
        next({
          type: GET_RANK,
          ranks: {
            [id]: songs
          }
        })
      })
  } else if(action.type === GET_LYRIC) {
    const { id } = action;
    fetch(`${url}/lyric?id=${id}`)
      .then((response) => (response.json()))
      .then((result) => {
        next({
          type: GET_LYRIC,
          lyric: result.lrc.lyric
        })
      })
  } else if(action.type === GET_COMMENTS) {
    const { id } = action;
    fetch(`${url}/comment/music?id=${id}&limit=10`)
      .then((response) => (response.json()))
      .then((result) => {
        const hostComments = [];
        const comments = [];
        result.hotComments.map((comment) => {
          const { avatarUrl, userId, nickname } = comment.user;
          hostComments.push({
            userId,
            nickname,
            avatarUrl,
            likedCount: comment.likedCount,
            time: comment.time,
            content: comment.content
          })
        })
        result.comments.map((comment) => {
          const { avatarUrl, userId, nickname } = comment.user;
          comments.push({
            userId,
            nickname,
            avatarUrl,
            likedCount: comment.likedCount,
            time: comment.time,
            content: comment.content
          })
        })
        next({
          type: GET_COMMENTS,
          hostComments,
          comments
        })
      })
  } else if(action.type === GET_SONG_DETAIL) {
    const { id } = action;
    fetch(`${url}/song/detail?ids=${id}`)
      .then((response) => (response.json()))
      .then((result) => {
        const picUrl = result.songs[0].al.picUrl;
        const name = result.songs[0].name;
        const artists = result.songs[0].ar;
        next({
          type: GET_SONG_DETAIL,
          song: {
            picUrl,
            name,
            artists
          }
        })
      })
  } else if(action.type === GET_MUSIC_URL) {
    const { id } = action;
    fetch(`${url}/music/url?id=${id}`)
      .then((response) => (response.json()))
      .then((result) => {
        next({
          type: GET_MUSIC_URL,
          musicUrl: result.data[0].url
        })
      })
  } else {
    next(action);
  }
}

export default appMiddleware;

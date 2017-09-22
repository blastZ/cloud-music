import { GET_REC_NEW_SONS, GET_RANK } from '../actions/app_action';

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
  } else {
    next(action);
  }
}

export default appMiddleware;

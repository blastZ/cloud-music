import { GET_REC_NEW_SONS, GET_RANK, GET_LYRIC, GET_COMMENTS,
         GET_SONG_DETAIL, GET_MUSIC_URL, LOGIN_WITH_PHONE,
         GET_USER_DETAIL, GET_PLAY_RECORD, GET_SEARCH_RESULT,
         GET_HOT_ARTISTS, GET_HOT_PLAY_LIST } from '../actions/app_action';

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
                setTimeout(() => {
                  next({
                    type: GET_REC_NEW_SONS,
                    recNewSongs
                  })
                }, 0)
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
        console.log(result);
        next({
          type: GET_LYRIC,
          lyric: result.lrc ? result.lrc.lyric : '纯音乐, 无歌词'
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
  } else if(action.type === LOGIN_WITH_PHONE) {
    const { userId } = action;
    let personalUserDetail = {};
    fetch(`${url}/user/detail?uid=${userId}`)
      .then((response) => (response.json()))
      .then((result) => {
        const avatarUrl = result.profile.avatarUrl;
        const name = result.profile.nickname;
        const signature = result.profile.signature;
        const birthday = result.profile.birthday;
        const city = result.profile.city;
        const follows = result.profile.follows;
        const followeds = result.profile.followeds;
        const playlistCount = result.profile.playlistCount;
        const level = result.level;
        personalUserDetail = {
          name,
          avatarUrl,
          signature,
          birthday,
          city,
          follows,
          followeds,
          playlistCount,
          level
        }
        store.dispatch({
          type: GET_PLAY_RECORD,
          id: userId
        })
        next({
          type: LOGIN_WITH_PHONE,
          personalUserDetail
        })
      })
  } else if(action.type === GET_USER_DETAIL) {
    const { id } = action;
    let userDetail = {};
    fetch(`${url}/user/detail?uid=${id}`)
      .then((response) => (response.json()))
      .then((result) => {
        const avatarUrl = result.profile.experts.avatarUrl;
        const name = result.profile.experts.nickname;
        const signature = result.profile.experts.signature;
        const birthday = result.profile.experts.birthday;
        const city = result.profile.experts.city;
        const follows = result.profile.experts.follows;
        const followeds = result.profile.experts.followeds;
        const playlistCount = result.profile.experts.playlistCount;
        const level = result.profile.level;
        userDetail = {
          name,
          avatarUrl,
          signature,
          birthday,
          city,
          follows,
          followeds,
          playlistCount,
          level
        }
      })
    next({
      type: 'GET_USER_DETAIL',
      userDetail
    })
  } else if(action.type === GET_PLAY_RECORD) {
    const { id } = action;
    const recordList = [];
    fetch(`${url}/user/record?uid=${id}&type=1`)
      .then((response) => (response.json()))
      .then((result) => {
        result.weekData.map((song) => {
          recordList.push({
            playCount: song.playCount,
            ar: song.song.ar,
            name: song.song.name,
            id: song.song.id
          })
        })
        next({
          type: GET_PLAY_RECORD,
          recordList
        })
      })
  } else if(action.type === GET_SEARCH_RESULT) {
    const { keywords } = action;
    const searchResultList = [];
    fetch(`${url}/search?keywords=${keywords}`)
      .then((response) => (response.json()))
      .then((result) => {
        result.result.songs.map((song) => {
          searchResultList.push({
            id: song.id,
            name: song.name,
            artists: song.artists,
            duration: song.duration
          })
        })
        next({
          type: GET_SEARCH_RESULT,
          searchResultList
        })
      })
  } else if(action.type === GET_HOT_ARTISTS) {
    const hotArtistsList = [];
    fetch(`${url}/top/artists?offset=0&limit=54`)
      .then((response) => (response.json()))
      .then((result) => {
        result.artists.map((artist) => {
          hotArtistsList.push({
            name: artist.name,
            picUrl: artist.img1v1Url,
            id: artist.id
          })
        })
        next({
          type: GET_HOT_ARTISTS,
          hotArtistsList
        })
      })
  } else if(action.type === GET_HOT_PLAY_LIST) {
    const hotPlayList = [];
    fetch(`${url}/top/playlist?limit=20&order=hot`)
      .then((response) => (response.json()))
      .then((result) => {
        result.playlists.map((playlist) => {
          hotPlayList.push({
            name: playlist.name,
            id: playlist.id,
            picUrl: playlist.coverImgUrl,
            tags: playlist.tags,
            playCount: playlist.playCount,
            creator: {
              id: playlist.creator.userId,
              name: playlist.creator.nickname
            }
          })
        })
        next({
          type: GET_HOT_PLAY_LIST,
          hotPlayList
        })
      })
  } else {
    next(action);
  }
}

export default appMiddleware;

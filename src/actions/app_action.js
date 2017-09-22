export const GET_REC_NEW_SONS = 'GET_REC_NEW_SONS';
export const GET_RANK = 'GET_RANK';

export const getRecNewSongs = () => ({
  type: GET_REC_NEW_SONS
})

export const getRank = (id) => ({
  type: GET_RANK,
  id
})

import { SHOULD_SHOW_LOGIN_VIEW } from '../actions/popups_action';

const initState = {
  showLoginView: false
}

const popupsReducer = (state=initState, action) => {
  switch (action.type) {
    case SHOULD_SHOW_LOGIN_VIEW: return ({
      ...state,
      showLoginView: !state.showLoginView
    })
    default: return state
  }
}

export default popupsReducer;

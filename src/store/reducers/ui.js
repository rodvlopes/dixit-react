import {
  TOGGLE_PROGRESS_BOARD,
  TOGGLE_MY_CARDS,
  SELECT_CARD
} from '../actions'

const defaultUiState = {
  progressBoardOpen: false,
  myCardsOpen: false
}

export default function ui (state = defaultUiState, action) {
  console.log('reducer progressBoardOpen', action)

  switch (action.type) {
    case TOGGLE_PROGRESS_BOARD:
      return {
        ...state,
        progressBoardOpen: !state.progressBoardOpen
      }

    case TOGGLE_MY_CARDS:
    case SELECT_CARD:
      return {
        ...state,
        myCardsOpen: !state.myCardsOpen
      }
    default:
      return state
  }
}

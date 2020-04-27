import { combineReducers } from 'redux'

import {
  TOGGLE_PROGRESS_BOARD,
  TOGGLE_MY_CARDS,
  SET_ROOM,
  ASSIGN_COLOR_TO_PLAYER,
  START_GAME,
  RECEIVE_GAME_STATE_FROM_SERVER
} from './actions'

function progressBoardOpen (state = false, action) {
  console.log('reducer progressBoardOpen', action)
  if (action.type === TOGGLE_PROGRESS_BOARD) {
    return !state
  } else return state
}

function myCardsOpen (state = false, action) {
  console.log('reducer myCardsOpen', action)
  if (action.type === TOGGLE_MY_CARDS) {
    return !state
  } else return state
}

// class Player {
//   constructor(color, name, score) {
//     Object.assign(this, {color, name, score})
//   }
// }

const defaultGameState = {
  room: null,
  players: [
    { color: 'yellow', name: null, score: null },
    { color: 'red', name: null, score: null },
    { color: 'blue', name: 'BIZU', score: 1 },
    { color: 'white', name: null, score: null },
    { color: 'black', name: null, score: null },
    { color: 'green', name: null, score: null }
  ],
  loggedInUser: null,
  started: false,
  serverUpdated: false
}

function game (state = defaultGameState, action) {
  console.log('reducer game', action)
  switch (action.type) {
    case SET_ROOM:
      return {
        ...state,
        room: action.id
      }
    case ASSIGN_COLOR_TO_PLAYER:
      var players = state.players
      var colorAssignedToIndex =
        players.indexOf(
          players.find(
            p => (p.name || '').toLowerCase() === action.username.toLowerCase()
          )
        )
      if (colorAssignedToIndex === -1) {
        players = players.map((p, i) => {
          if (colorAssignedToIndex === -1 & p.name === null) {
            colorAssignedToIndex = i
            return { color: p.color, name: action.username, score: 0 }
          }
          return p
        })
      }
      return {
        ...state,
        players,
        loggedInUser: players[colorAssignedToIndex],
        serverUpdated: false
      }
    case START_GAME:
      return {
        ...state,
        started: true,
        serverUpdated: false
      }
    case RECEIVE_GAME_STATE_FROM_SERVER:
      return {
        ...action.gameState,
        loggedInUser: state.loggedInUser,
        serverUpdated: true
      }
    default:
      return state
  }
}

const appReducers = combineReducers({
  progressBoardOpen,
  myCardsOpen,
  game
})

export default appReducers

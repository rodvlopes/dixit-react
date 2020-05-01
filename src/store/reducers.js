import { combineReducers } from 'redux'
import { dealCards } from './helper'

import {
  TOGGLE_PROGRESS_BOARD,
  TOGGLE_MY_CARDS,
  SET_ROOM,
  ASSIGN_COLOR_TO_PLAYER,
  START_GAME,
  RECEIVE_GAME_STATE_FROM_SERVER,
  SELECT_CARD
} from './actions'

function progressBoardOpen (state = false, action) {
  console.log('reducer progressBoardOpen', action)
  if (action.type === TOGGLE_PROGRESS_BOARD) {
    return !state
  } else return state
}

function myCardsOpen (state = false, action) {
  console.log('reducer myCardsOpen', action)
  if (action.type === TOGGLE_MY_CARDS || action.type === SELECT_CARD) {
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
    { index: 0, color: 'yellow', name: null, score: null },
    { index: 1, color: 'red', name: null, score: null },
    { index: 2, color: 'blue', name: 'BIZU', score: 1 },
    { index: 3, color: 'white', name: null, score: null },
    { index: 4, color: 'black', name: null, score: null },
    { index: 5, color: 'green', name: null, score: null }
  ],
  loggedInUser: null,
  started: false,
  storyTeller: null,
  listeners: [],
  serverUpdated: false,
  cards: Array(84).fill().map((u, i) => ({ owner: null, votes: null, selected: false, index: i })),
  selectedCards: [],
  storyTellerSelected: false,
  listenersSelected: false
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
            p => p.name === action.username.toUpperCase()
          )
        )
      if (colorAssignedToIndex === -1) {
        players = players.map((p, i) => {
          if (colorAssignedToIndex === -1 & p.name === null) {
            colorAssignedToIndex = i
            return { ...p, name: action.username.toUpperCase(), score: 0 }
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
      var storyTeller = state.players[0]

      return {
        ...state,
        started: true,
        storyTeller,
        cards: dealCards(state.cards, state.players),
        listeners: state.players.filter(p => p.name && p.index !== storyTeller.index),
        serverUpdated: false
      }
    case SELECT_CARD:
      var cards = state.cards.map(c =>
        c.index === action.card.index ? { ...action.card, selected: true } : c
      )
      var selectedCards = cards.filter(c => c.selected)

      return {
        ...state,
        cards,
        selectedCards,
        storyTellerSelected: selectedCards.filter(c =>
          c.owner === state.storyTeller.index
        ).length,
        listenersSelected: selectedCards.filter(c =>
          c.owner !== state.storyTeller.index
        ).length,
        serverUpdated: false
      }
    case RECEIVE_GAME_STATE_FROM_SERVER:
      return {
        ...action.gameState,
        loggedInUser: state.loggedInUser, // TODO: remove from shared game state
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

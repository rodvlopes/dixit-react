/*
 * action types
 */

export const TOGGLE_PROGRESS_BOARD = 'TOGGLE_PROGRESS_BOARD'
export const TOGGLE_MY_CARDS = 'TOGGLE_MY_CARDS'
export const SET_ROOM = 'SET_ROOM'
export const ASSIGN_COLOR_TO_PLAYER = 'ASSIGN_COLOR_TO_PLAYER'
export const START_GAME = 'START_GAME'
export const RECEIVE_GAME_STATE_FROM_SERVER = 'RECEIVE_GAME_STATE_FROM_SERVER'
export const SELECT_CARD = 'SELECT_CARD'
export const VOTE_CARD = 'VOTE_CARD'
export const NEXT_ROUND = 'NEXT_ROUND'

/*
 * other constants
 */

/*
 * action creators
 */

export function toggleProgressBoard () {
  return { type: TOGGLE_PROGRESS_BOARD }
}

export function toggleMyCards () {
  console.log('toggleMyCards')
  return { type: TOGGLE_MY_CARDS }
}

export function setRoom (id) {
  console.log('setRoom', id)
  return { type: SET_ROOM, id }
}

export function assignColorToPlayer (username) {
  console.log('assignColorToPlayer', username)
  return { type: ASSIGN_COLOR_TO_PLAYER, username }
}

export function startGame () {
  console.log('startGame')
  return { type: START_GAME }
}

export function receiveGameStateFromServer (gameState) {
  console.log('receiveGameStateFromServer', gameState)
  return { type: RECEIVE_GAME_STATE_FROM_SERVER, gameState }
}

export function selectCard (card) {
  console.log('selectCard', card)
  return { type: SELECT_CARD, card }
}

export function voteCard (card, voter) {
  console.log('voteCard', card, voter)
  return { type: VOTE_CARD, card, voter }
}

export function nextRound () {
  console.log('nextRound')
  return { type: NEXT_ROUND }
}

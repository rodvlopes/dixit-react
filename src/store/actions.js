/*
 * action types
 */

export const TOGGLE_PROGRESS_BOARD = 'TOGGLE_PROGRESS_BOARD'
export const TOGGLE_MY_CARDS = 'TOGGLE_MY_CARDS'
export const SET_ROOM_ID = 'SET_ROOM_ID'
export const ASSIGN_COLOR_TO_PLAYER = 'ASSIGN_COLOR_TO_PLAYER'
export const START_GAME = 'START_GAME'

/*
 * other constants
 */

/*
 * action creators
 */

// export function addTodo(text) {
//   return { type: ADD_TODO, text }
// }

export function toggleProgressBoard () {
  return { type: TOGGLE_PROGRESS_BOARD }
}

export function toggleMyCards () {
  console.log('toggleMyCards')
  return { type: TOGGLE_MY_CARDS }
}

export function setRoomId (id) {
  console.log('setRoomId', id)
  return { type: SET_ROOM_ID, id }
}

export function assignColorToPlayer (username) {
  console.log('assignColorToPlayer', username)
  return { type: ASSIGN_COLOR_TO_PLAYER, username }
}

export function startGame () {
  console.log('startGame')
  return { type: START_GAME }
}

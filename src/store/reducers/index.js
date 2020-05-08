import { combineReducers } from 'redux'
import ui from './ui'
import game from './game'

const appReducers = combineReducers({
  ui,
  game
})

export default appReducers

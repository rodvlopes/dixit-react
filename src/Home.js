/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameReady from './GameReady'
import CreateRoom from './CreateRoom'
import RequestUsername from './RequestUsername'
import GameWaitingToStart from './GameWaitingToStart'
import { useRoomChange } from './hooks'
import { connect } from 'react-redux'
import { setRoomId } from './store/actions'

function HomePresentational ({
  roomId,
  setRoomId,
  loggedInUser,
  gameStated
}) {
  useRoomChange(setRoomId)

  if (roomId) {
    if (loggedInUser) {
      if (gameStated) {
        return <GameReady />
      } else {
        return <GameWaitingToStart />
      }
    } else {
      return <RequestUsername />
    }
  } else {
    return <CreateRoom />
  }
}

const mapStateToProps = state => ({
  roomId: state.roomId,
  loggedInUser: state.game.loggedInUser,
  gameStated: state.game.started
})

const mapDispatchToProps = dispatch => ({
  setRoomId: id => dispatch(setRoomId(id))
})

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePresentational)
export default Home

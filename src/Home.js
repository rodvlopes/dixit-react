/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameReady from './GameReady'
import CreateRoom from './CreateRoom'
import RequestUsername from './RequestUsername'
import GameWaitingToStart from './GameWaitingToStart'
import { useWebsocket, useRoomChange } from './hooks'
import { connect } from 'react-redux'
import { setRoom, receiveGameStateFromServer } from './store/actions'

function HomePresentational ({
  game,
  setRoom,
  loggedInUser,
  receiveGameStateFromServer
}) {
  useRoomChange(setRoom)

  if (game.room) {
    return <RoomCreated
      loggedInUser={loggedInUser}
      game={game}
      receiveGameStateFromServer={receiveGameStateFromServer}
    />
  } else {
    return <CreateRoom />
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.game.loggedInUser,
  game: state.game
})

const mapDispatchToProps = dispatch => ({
  setRoom: id => dispatch(setRoom(id)),
  receiveGameStateFromServer: gs => dispatch(receiveGameStateFromServer(gs))
})

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePresentational)
export default Home

function RoomCreated ({ loggedInUser, game, receiveGameStateFromServer }) {
  const username = loggedInUser ? loggedInUser.name : 'no-login'
  useWebsocket(username, game, receiveGameStateFromServer)

  if (loggedInUser) {
    if (game.started) {
      return <GameReady />
    } else {
      return <GameWaitingToStart />
    }
  } else {
    return <RequestUsername />
  }
}

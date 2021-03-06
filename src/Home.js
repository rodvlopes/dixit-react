/* eslint 'react/prop-types' : 0 */
import React from "react";
import GameStarted from "./GameStarted";
import CreateRoom from "./CreateRoom";
import RequestUsername from "./RequestUsername";
import GameWaitingToStart from "./GameWaitingToStart";
import WaitingServer from "./WaitingServer";
import EndOfMatch from "./EndOfMatch";
import { useSyncServerState, useRoom } from "./hooks";
import { connect } from "react-redux";
import { setRoom, receiveGameStateFromServer } from "./store/actions";

function HomePresentational({ room, setRoom }) {
  useRoom(setRoom);

  if (room === "init") {
    return <WaitingServer />;
  } else if (room) {
    return <Room />;
  } else {
    return <CreateRoom />;
  }
}

const Home = connect(
  (state) => ({
    room: state.game.room,
  }),
  (dispatch) => ({
    setRoom: (id) => dispatch(setRoom(id)),
    receiveGameStateFromServer: (gs) =>
      dispatch(receiveGameStateFromServer(gs)),
  })
)(HomePresentational);

export default Home;

function RoomPresentetional({
  loggedInUser,
  game,
  receiveGameStateFromServer,
}) {
  const username = loggedInUser ? loggedInUser.name : "no-login";
  const serverReady = useSyncServerState(
    username,
    game,
    receiveGameStateFromServer
  );

  if (!serverReady) {
    return <WaitingServer />;
  }

  if (game.endOfMatch) {
    return <EndOfMatch />;
  } else if (loggedInUser) {
    if (game.started) {
      return <GameStarted />;
    } else {
      return <GameWaitingToStart />;
    }
  } else {
    return <RequestUsername />;
  }
}

const Room = connect(
  (state) => ({
    loggedInUser: state.game.loggedInUser,
    game: state.game,
  }),
  (dispatch) => ({
    receiveGameStateFromServer: (gameState) =>
      dispatch(receiveGameStateFromServer(gameState)),
  })
)(RoomPresentetional);

/* eslint 'react/prop-types' : 0 */
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AppHeader from "./AppHeader";
import MyCards from "./MyCards";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";
import { connect } from "react-redux";
import { toggleProgressBoard, toggleMyCards } from "./store/actions";

function GameStartedPresentational({
  myCardsOpen,
  toggleMyCards,
  progressBoardOpen,
  toggleProgressBoard,
}) {
  return (
    <>
      <AppHeader
        openMyCards={toggleMyCards}
        openProgress={toggleProgressBoard}
      />
      <Drawer anchor="left" open={myCardsOpen} onClose={toggleMyCards}>
        <MyCards onClose={toggleMyCards} />
      </Drawer>
      <GameBoard />
      <Drawer
        anchor="right"
        open={progressBoardOpen}
        onClose={toggleProgressBoard}
      >
        <ScoreBoard onClose={toggleProgressBoard} />
      </Drawer>
    </>
  );
}

const GameStarted = connect(
  (state) => state.ui,
  (dispatch) => ({
    toggleProgressBoard: (id) => dispatch(toggleProgressBoard()),
    toggleMyCards: (id) => dispatch(toggleMyCards()),
  })
)(GameStartedPresentational);

export default GameStarted;

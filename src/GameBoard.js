/* eslint 'react/prop-types' : 0 */
import React from "react";
import GameBoardElection from "./GameBoardElection";
import WaitingListeners from "./WaitingListeners";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import i18n from "./i18n";

function GameBoardPresentional({
  selectedCards,
  storyTellerSelected,
  listenersSelected,
  listeners,
  storyTeller,
}) {
  const noSelectedListeners = listeners.filter(
    (p) => !selectedCards.find((c) => c.owner === p.index)
  );

  console.log("noSelectedListeners", listeners, noSelectedListeners);
  if (storyTellerSelected) {
    if (listenersSelected) {
      return <GameBoardElection cards={selectedCards} listeners={listeners} />;
    } else {
      return <WaitingListeners players={noSelectedListeners} />;
    }
  } else {
    return <WaitingStoryTeller player={storyTeller} />;
  }
}

function WaitingStoryTeller({ player }) {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      display="flex"
      height="50vh"
    >
      <h3>{i18n("WaitingStoryTellerToSelect")(player.name)}</h3>
    </Box>
  );
}

const GameBoard = connect((state) => ({
  selectedCards: state.game.selectedCards,
  storyTellerSelected: state.game.storyTellerSelected,
  listenersSelected: state.game.listenersSelected,
  listeners: state.game.listeners,
  storyTeller: state.game.storyTeller,
}))(GameBoardPresentional);

export default GameBoard;

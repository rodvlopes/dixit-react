/* eslint 'react/prop-types' : 0 */
import React from "react";
import { Button, Box } from "@material-ui/core";
import AppHeader from "./AppHeader";
import { startGame } from "./store/actions";
import { connect } from "react-redux";

function GameWaitingToStartPresentational({ startGame, numPlayers }) {
  const onClick = (e) => startGame();
  return (
    <>
      <AppHeader />
      <Box
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        display="flex"
        height="30vh"
      >
        <h3>
          Depois que todos os jogadors estiverem presentes, pressione o botão
          para iniciar.
        </h3>
      </Box>
      <Box justifyContent="center" alignItems="center" display="flex">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={onClick}
          disabled={numPlayers < 3}
        >
          Iniciar o Jogo
        </Button>
      </Box>
      <Box justifyContent="center" alignItems="center" display="flex">
        Mínimo: 3 jogadores.
      </Box>
    </>
  );
}

const GameWaitingToStart = connect(
  (state) => ({
    numPlayers: state.game.players.filter((p) => p.name).length,
  }),
  (dispatch) => ({
    startGame: () => dispatch(startGame()),
  })
)(GameWaitingToStartPresentational);

export default GameWaitingToStart;

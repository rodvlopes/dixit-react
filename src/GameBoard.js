/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameCard from './GameCard'
import { Grid, Box } from '@material-ui/core'
import { connect } from 'react-redux'

function GameBoardPresentional ({
  selectedCards,
  storyTellerSelected,
  listenersSelected,
  listeners,
  storyTeller
}) {
  const noVotePlayers = listeners
    .filter(p => !selectedCards.find(c => c.owner === p.index))

  if (storyTellerSelected.length) {
    if (listenersSelected.length) {
      return <GameBoardElection cards={selectedCards} />
    } else {
      return <WaitingListeners players={noVotePlayers} />
    }
  } else {
    return <WaitingStoryTeller player={storyTeller} />
  }
}

function GameBoardElection ({ cards }) {
  return (
    <Grid container spacing={3}>
      {cards.map(i =>
        <Grid item key={i} xs={12} md={6} lg={4}>
          <GameCard name={i} />
        </Grid>
      )}
    </Grid>
  )
}

function WaitingStoryTeller ({ player }) {
  const name = player.name

  return (
    <Box justifyContent="center" alignItems="center" textAlign="center" display="flex" height="50vh">
      <h3>Aguardando o narrador ({name}) selecionar a carta.</h3>
    </Box>
  )
}

function WaitingListeners ({ players }) {
  const names = players.map(p => p.name).join(', ')

  return (
    <Box justifyContent="center" alignItems="center" textAlign="center" display="flex" height="50vh">
      <h3>Aguardando os votos dos jogadores: {names}</h3>
    </Box>
  )
}

const GameBoard = connect(state => ({
  selectedCards: state.game.cards.filter(c => c.selected),
  storyTellerSelected: state.game.cards
    .filter(c => c.selected && c.owner === state.game.storyTeller).length,
  listeners: state.game.players.filter(p => p.nome && p.index !== state.game.storyTeller),
  storyTeller: state.game.players[state.game.storyTeller]
}))(GameBoardPresentional)

export default GameBoard

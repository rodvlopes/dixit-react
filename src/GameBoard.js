/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameCard from './GameCard'
import { Grid, Box, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import DraftsIcon from '@material-ui/icons/Drafts'
import { connect } from 'react-redux'

function GameBoardPresentional ({
  selectedCards,
  storyTellerSelected,
  listenersSelected,
  listeners,
  storyTeller
}) {
  const noVoteListeners = listeners
    .filter(p => !selectedCards.find(c => c.owner === p.index))

  console.log('noVoteListeners', listeners, noVoteListeners)
  if (storyTellerSelected) {
    if (listenersSelected) {
      return <GameBoardElection cards={selectedCards} />
    } else {
      return <WaitingListeners players={noVoteListeners} />
    }
  } else {
    return <WaitingStoryTeller player={storyTeller} />
  }
}

function GameBoardElection ({ cards }) {
  return (
    <Grid container spacing={3}>
      {cards.map(c =>
        <Grid item key={c.index} xs={12} md={6} lg={4}>
          <GameCard name={c} />
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
  return (
    <>
      <Box justifyContent="center" alignItems="center" textAlign="center" display="flex" height="20vh">
        <h4>Aguardando os votos dos jogadores:</h4>
      </Box>
      <Box justifyContent="center" alignItems="center" textAlign="center" display="flex">
        <List>
          {players.map(p =>
            <ListItem key={p.index}>
              <ListItemIcon>
                <DraftsIcon style={{ color: p.color }} />
              </ListItemIcon>
              <ListItemText primary={p.name} />
            </ListItem>
          )}
        </List>
      </Box>
    </>
  )
}

const GameBoard = connect(state => ({
  selectedCards: state.game.selectedCards,
  storyTellerSelected: state.game.storyTellerSelected,
  listenersSelected: state.game.listenersSelected,
  listeners: state.game.listeners,
  storyTeller: state.game.storyTeller
}))(GameBoardPresentional)

export default GameBoard

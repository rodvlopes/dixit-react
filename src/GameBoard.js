/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameBoardElection from './GameBoardElection'
import { Box, List, ListItem, ListItemText, ListItemIcon }
  from '@material-ui/core'
import PersonIcon from '@material-ui/icons/AccountCircle'
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
      return <GameBoardElection cards={selectedCards} listeners={listeners} />
    } else {
      return <WaitingListeners players={noVoteListeners} />
    }
  } else {
    return <WaitingStoryTeller player={storyTeller} />
  }
}

function WaitingStoryTeller ({ player }) {
  const name = player.name

  return (
    <Box justifyContent="center" alignItems="center" textAlign="center" display="flex" height="50vh">
      <h3>Aguardando o narrador ({name}) selecionar a carta e dar a <b>DICA</b>.</h3>
    </Box>
  )
}

function WaitingListeners ({ players }) {
  return (
    <>
      <Box justifyContent="center" alignItems="center" textAlign="center" display="flex" height="20vh">
        <h4>Aguardando os jogadores a selecionarem suas cartas:</h4>
      </Box>
      <Box justifyContent="center" alignItems="center" textAlign="center" display="flex">
        <List>
          {players.map(p =>
            <ListItem key={p.index}>
              <ListItemIcon>
                <PersonIcon style={{ color: p.color }} />
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

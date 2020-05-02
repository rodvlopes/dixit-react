/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameCard from './GameCard'
import { Grid, Box, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
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

function GameBoardElectionPresentational ({ cards, listeners, electionRequired }) {
  console.log('GameBoardElectionPresentational', cards.map(c => c.votes))

  const votesNum = cards.reduce((acc, c) => acc + c.votes.length, 0)
  const electionFinished = votesNum - listeners.length === 0
  const width = electionFinished ? 6 : 12

  return (
    <Grid container spacing={3}>
      {cards.map(c =>
        <Grid item key={c.index} xs={width} md={6} lg={4}>
          <GameCard
            card={c}
            electionRequired={electionRequired}
            revealVotes={electionFinished}
          />
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

const electionRequiredChecker = ({ loggedInUser, storyTeller, selectedCards, players }) => {
  const isAllCardsSelected = selectedCards.length === players.filter(p => p.name).length

  const isLoggedInUserTheStoryTeller =
    loggedInUser.index === storyTeller.index

  const hasLoggedInUserVoted = selectedCards
    .filter(c => c.votes.find(v => v.index === loggedInUser.index)).length

  console.log('electionRequiredChecker', isAllCardsSelected, isLoggedInUserTheStoryTeller)

  return isLoggedInUserTheStoryTeller ? false : isAllCardsSelected && !hasLoggedInUserVoted
}

const GameBoardElection = connect(state => ({
  electionRequired: electionRequiredChecker(state.game)
}))(GameBoardElectionPresentational)

const GameBoard = connect(state => ({
  selectedCards: state.game.selectedCards,
  storyTellerSelected: state.game.storyTellerSelected,
  listenersSelected: state.game.listenersSelected,
  listeners: state.game.listeners,
  storyTeller: state.game.storyTeller
}))(GameBoardPresentional)

export default GameBoard

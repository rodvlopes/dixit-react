/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameCard from './GameCard'
import { Grid, Box, Button, Collapse }
  from '@material-ui/core'
import PersonIcon from '@material-ui/icons/AccountCircle'
import { calcRoundScore } from './store/helper'
import { nextRound } from './store/actions'
import { connect } from 'react-redux'

function GameBoardElectionPresentational ({
  cards,
  listeners,
  electionRequired,
  nextRound
}) {
  const votesNum = cards.reduce((acc, c) => acc + c.votes.length, 0)
  const electionFinished = votesNum - listeners.length === 0
  const noVoteListeners = listeners
    .filter(p => !cards.find(c => c.votes.map(v => v.index).includes(p.index)))

  return (
    <>
      <Collapse in={electionFinished}>
        <RoundScore cards={cards}/>
      </Collapse>
      <WaitingVoters players={noVoteListeners} />
      <ElectionBoard { ...{ cards, electionRequired, electionFinished } } />
    </>
  )
}

function WaitingVoters ({ players }) {
  return (
    <Box justifyContent="center" alignItems="center" textAlign="center" display="flex">
      <p>Aguardando:</p>
      {players.map(p =>
        <PersonIcon key={p.index} style={{ color: p.color, marginLeft: '10px' }} />
      )}
    </Box>
  )
}

function ElectionBoard ({ cards, electionRequired, electionFinished }) {
  const revealVotes = !electionRequired
  const width = revealVotes ? 6 : 12

  return (
    <Grid container spacing={2}>
      {cards.map(c =>
        <Grid item key={c.index} xs={width} md={6} lg={4}>
          <GameCard
            card={c}
            electionRequired={electionRequired}
            revealVotes={revealVotes}
            electionFinished={electionFinished}
          />
        </Grid>
      )}
    </Grid>
  )
}

function RoundScorePresentional ({ players, cards, storyTeller, nextRound }) {
  const score = calcRoundScore(players, cards, storyTeller)

  return (
    <div>
      <Box display="flex" flexGrow={1}>
        {players.map(p => {
          return (
            <Box key={p.color} className={`player ${p.color}`} width={1 / 6}>
              {score[p.index] !== undefined ? `+${score[p.index]}` : ''}
            </Box>
          )
        })}
      </Box>
      <NextRoundButton onClick={e => nextRound()} />
    </div>
  )
}

const RoundScore = connect(state => ({
  players: state.game.players,
  storyTeller: state.game.storyTeller
}),
dispatch => ({
  nextRound: () => dispatch(nextRound())
}))(RoundScorePresentional)

function NextRoundButton ({ onClick }) {
  return (
    <Box justifyContent="center" alignItems="center" display="flex" my={1}>
      <Button
        variant="outlined" color="secondary" size="large"
        onClick={onClick}
      >
        Inicar Próxima Rodada
      </Button>
    </Box>
  )
}

const electionRequiredChecker = ({ loggedInUser, storyTeller, selectedCards, players }) => {
  const isAllCardsSelected = selectedCards.length === players.filter(p => p.name).length

  const isLoggedInUserTheStoryTeller =
    loggedInUser.index === storyTeller.index

  const hasLoggedInUserVoted = selectedCards
    .filter(c => c.votes.find(v => v.index === loggedInUser.index)).length

  return isLoggedInUserTheStoryTeller ? false : isAllCardsSelected && !hasLoggedInUserVoted
}

const GameBoardElection = connect(state => ({
  electionRequired: electionRequiredChecker(state.game)
}))(GameBoardElectionPresentational)

export default GameBoardElection

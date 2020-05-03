/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameCard from './GameCard'
import { Grid, Box, Button, Collapse }
  from '@material-ui/core'
import { calcRoundScore } from './store/helper'
import { nextRound } from './store/actions'
import { connect } from 'react-redux'

function GameBoardElectionPresentational ({ cards, listeners, electionRequired, nextRound }) {
  const votesNum = cards.reduce((acc, c) => acc + c.votes.length, 0)
  const electionFinished = votesNum - listeners.length === 0
  const width = electionFinished ? 6 : 12

  return (
    <>
      <Collapse in={electionFinished}>
        <div>
          <RoundScore cards={cards}/>
          <NextRoundButton onClick={e => nextRound()} />
        </div>
      </Collapse>
      <Grid container spacing={2}>
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
    </>
  )
}

function RoundScorePresentional ({ players, cards, storyTeller }) {
  const score = calcRoundScore(players, cards, storyTeller)

  return (
    <Box display="flex" flexGrow={1}>
      {players.map(p => {
        return (
          <Box key={p.color} className={`player ${p.color}`} width={1 / 6}>
            {score[p.index] !== undefined ? `+${score[p.index]}` : ''}
          </Box>
        )
      })}
    </Box>
  )
}

const RoundScore = connect(state => ({
  players: state.game.players,
  storyTeller: state.game.storyTeller
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

  console.log('electionRequiredChecker', isAllCardsSelected, isLoggedInUserTheStoryTeller)

  return isLoggedInUserTheStoryTeller ? false : isAllCardsSelected && !hasLoggedInUserVoted
}

const GameBoardElection = connect(state => ({
  electionRequired: electionRequiredChecker(state.game)
}),
dispatch => ({
  nextRound: () => dispatch(nextRound())
}))(GameBoardElectionPresentational)

export default GameBoardElection
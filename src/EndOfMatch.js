/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { ScoreGrid } from './ScoreBoard'
import { PlayersHeader } from './AppHeader'
import { Box } from '@material-ui/core'
import { connect } from 'react-redux'

function EndOfMatchPresentional ({ players }) {
  return (
    <>
      <Box justifyContent="center" alignItems="center" display="flex" height="20vh">
        Fim de Jogo!
      </Box>
      <PlayersHeader />
      <ScoreGrid players={players}/>
    </>
  )
}

const EndOfMatch = connect(state => ({
  players: state.game.players
}))(EndOfMatchPresentional)

export default EndOfMatch

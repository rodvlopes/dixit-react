/* eslint 'react/prop-types' : 0 */
import React from 'react'
import './global.styl'
import { AppBar, Toolbar, Button, Box } from '@material-ui/core'
import RecentActorsIcon from '@material-ui/icons/RecentActors'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  thinBtn: {
    minWidth: 0,
    '& .MuiButton-startIcon': {
      marginRight: 0
    }
  }
}))

export default function AppHeader ({ openMyCards, openProgress }) {
  const classes = useStyles()

  return (
    <AppBar position="relative">
      <Toolbar>
        <Button
          className={classes.thinBtn}
          variant="contained"
          onClick={openMyCards}
          disabled={!openMyCards}
          startIcon={<RecentActorsIcon />}>{''}
        </Button>
        <Box flexGrow={1} textAlign="center"><User /></Box>
        <Button
          className={classes.thinBtn}
          variant="contained"
          onClick={openProgress}
          disabled={!openProgress}
          startIcon={<DashboardIcon />}>{''}
        </Button>
      </Toolbar>
      <PlayersHeader />
    </AppBar>
  )
}

function PlayersHeaderPresentational ({ players, storyTeller }) {
  return (
    <Box display="flex">
      {players.map(p => {
        var storyTellerClass = storyTeller && p.index === storyTeller.index ? 'story-teller' : ''
        return (
          <Box key={p.color} className={`player ${p.color} ${storyTellerClass}`} width={1 / 6}>
            {p.name === null ? '-' : p.name }
          </Box>
        )
      })}
    </Box>
  )
}

const PlayersHeader = connect(state => ({
  players: state.game.players,
  storyTeller: state.game.storyTeller
}), null)(PlayersHeaderPresentational)

export { PlayersHeader }

function UserPresentational ({ name }) {
  return (
    <span>{name}</span>
  )
}

const User = connect(state => ({
  name: state.game.loggedInUser.name
}), null)(UserPresentational)

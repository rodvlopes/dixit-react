/* eslint 'react/prop-types' : 0 */
import React from 'react'
import './global.styl'
import { AppBar, Toolbar, IconButton, Box } from '@material-ui/core'
import RecentActorsIcon from '@material-ui/icons/RecentActors'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  playersHeader: {
    display: 'flex',
    '&>div': {
      borderRadius: '2px',
      margin: '2px',
      padding: '2px',
      textTransform: 'uppercase',
      textAlign: 'center'
    }
  }
}))

export default function AppHeader ({ openMyCards, openProgress }) {
  const classes = useStyles()

  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton onClick={openMyCards} disabled={!openMyCards}>
          <RecentActorsIcon className={classes.icon} />
        </IconButton>
        <h4 className={classes.title}> DiXit <User /></h4>
        <IconButton onClick={openProgress} disabled={!openProgress}>
          <DashboardIcon className={classes.icon} />
        </IconButton>
      </Toolbar>
      <PlayersHeader />
    </AppBar>
  )
}

function PlayersHeaderPresentational ({ players }) {
  const classes = useStyles()

  return (
    <div className={classes.playersHeader}>
      {players.map(p => {
        return (
          <Box key={p.color} className={p.color} width={1 / 6}>
            {p.name === null ? '-' : p.name }
          </Box>
        )
      })}
    </div>
  )
}

const PlayersHeader = connect(state => ({
  players: state.game.players
}), null)(PlayersHeaderPresentational)

function UserPresentational ({ name }) {
  return (
    <span>{name}</span>
  )
}

const User = connect(state => ({
  name: state.game.loggedInUser.name
}), null)(UserPresentational)

/* eslint 'react/prop-types' : 0 */
import './global.styl'
import React from 'react'
import { Grid, Box, AppBar, Toolbar, IconButton } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  }
}))

function ScoreBoardPresentational ({ onClose, players }) {
  const classes = useStyles()

  return (
    <>
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <IconButton onClick={onClose}>
            <NavigateNextIcon />
          </IconButton>
          <h4 className={classes.title}>Tabuleiro de Pontuação</h4>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        {players.map(p => {
          return (
            <Grid item key={p.color} xs={2}>
              <Box className={p.color} p={2}>
                {p.score === null ? '-' : p.score }
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

const ScoreBoard = connect(state => ({
  players: state.game.players
}), null)(ScoreBoardPresentational)

export default ScoreBoard
/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { Grid, AppBar, Toolbar, IconButton } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import GameCard from './GameCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  }
}))

export default function MyCards ({ onClose }) {
  const classes = useStyles()

  return (
    <>
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <h4 className={classes.title}>Minha Cartas</h4>
          <IconButton onClick={onClose}>
            <NavigateBeforeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3}>
        <Grid item key={1} xs={12} md={6}>
          <GameCard name="001" />
        </Grid>
        <Grid item key={2} xs={12} md={6}>
          <GameCard name="002" />
        </Grid>
      </Grid>
    </>
  )
}

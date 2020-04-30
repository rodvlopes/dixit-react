/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { Grid, AppBar, Toolbar, IconButton } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import GameCard from './GameCard'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  }
}))

function MyCardsPresentational ({ cards, onClose }) {
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
        {cards.map(c =>
          <Grid item key={c.index} xs={12} md={6} lg={4}>
            <GameCard name={c.index} />
          </Grid>
        )}
      </Grid>
    </>
  )
}

const MyCards = connect(state => ({
  cards: state.game.cards.filter(c => c.owner === state.game.loggedInUser.index)
}))(MyCardsPresentational)

export default MyCards

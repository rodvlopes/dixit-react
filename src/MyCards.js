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

function MyCardsPresentational ({ cards, onClose, selectionRequired }) {
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
            <GameCard
              card={c}
              selectionRequired={selectionRequired}
            />
          </Grid>
        )}
      </Grid>
    </>
  )
}

const selectionRequiredChecker = ({ loggedInUser, storyTeller, selectedCards }) => {
  const hasStoryTellerSelected =
    selectedCards.filter(c => c.owner === storyTeller.index).length

  const hasListenerSelected =
    selectedCards.filter(c => c.owner === loggedInUser.index).length

  const isLoggedInUserTheStoryTeller =
    loggedInUser.index === storyTeller.index

  console.log(hasStoryTellerSelected, hasListenerSelected, isLoggedInUserTheStoryTeller)

  if (hasStoryTellerSelected) {
    return isLoggedInUserTheStoryTeller ? false : !hasListenerSelected
  } else {
    return isLoggedInUserTheStoryTeller
  }
}

const MyCards = connect(state => ({
  cards: state.game.cards.filter(c => c.owner === state.game.loggedInUser.index),
  selectionRequired: selectionRequiredChecker(state.game)
}))(MyCardsPresentational)

export default MyCards

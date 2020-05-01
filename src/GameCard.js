/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { Card, CardContent, CardHeader, CardActions, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { selectCard } from './store/actions'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& img': {
      width: '100%'
    }
  },
  cardContent: {
    flexGrow: 1,
    paddingBottom: 0
  },
  cardActions: {
    flexDirection: 'column'
  }
}))

function GameCardPresentational ({ card, selectionRequired, selectCard }) {
  const classes = useStyles()
  const votes = false
  let Votes = null
  let SelectAction = null

  if (votes) {
    Votes = <CardHeader title="votos" />
  }

  if (selectionRequired) {
    SelectAction =
      <CardActions className={classes.cardActions}>
        <Button variant="outlined" size="small" onClick={ev => selectCard(card)}>Selecionar Esta</Button>
      </CardActions>
  }

  return (
    <Card className={classes.card}>
      { Votes }
      <CardContent className={classes.cardContent}>
        <img src={`cards/card_${card.index}.png`} />
      </CardContent>
      { SelectAction }
    </Card>
  )
}

const GameCard = connect(null,
  dispatch => ({
    selectCard: card => dispatch(selectCard(card))
  }))(GameCardPresentational)

export default GameCard

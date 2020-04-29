/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameCard from './GameCard'
import Grid from '@material-ui/core/Grid'

export default function GameBoard ({ cards }) {
  return (
    <Grid container spacing={3}>
      {cards.map(i =>
        <Grid item key={i} xs={12} md={6}>
          <GameCard name={i} />
        </Grid>
      )}
    </Grid>
  )
}

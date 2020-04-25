/* eslint 'react/prop-types' : 0 */
import React from 'react'
import GameCard from './GameCard'
import Grid from '@material-ui/core/Grid'

export default function GameBoard ({ children, title, actions }) {
  const cards = ['back', '003', '004']
  return (
    <Grid container spacing={3}>
      {cards.map((card) => {
        return (
          <Grid item key={card} xs={12} md={6}>
            <GameCard name={card} />
          </Grid>
        )
      })}
    </Grid>
  )
}

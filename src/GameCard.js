/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& img': {
      maxWidth: '100%'
    }
  },
  cardContent: {
    flexGrow: 1
  }
}))

export default function MyCards ({ name }) {
  const classes = useStyles()
  const votes = false
  let Votes = null

  if (votes) {
    Votes = <CardHeader title="votos" />
  }

  return (
    <Card className={classes.card}>
      { Votes }
      <CardContent className={classes.cardContent}>
        <img src={`card${name}.jpg`} />
      </CardContent>
    </Card>
  )
}

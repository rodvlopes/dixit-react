/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { Button, Box } from '@material-ui/core'

export default function CreateRoom () {
  const generateSimpleId = (length = 3) =>
    [...Array(length)].map(() =>
      (Math.random() * 32 | 0).toString(32)
    ).join('')

  const onClick = (e) => {
    const id = `#${generateSimpleId()}`
    document.location.hash = id
  }

  /* It's no required to set room on the store because of the hashchange listener will do */

  return (
    <Box justifyContent="center" alignItems="center" display="flex" height="100vh">
      <Button variant="contained" color="primary" size="large" onClick={onClick} >
        Criar Sala
      </Button>
    </Box>
  )
}

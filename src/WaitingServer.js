/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

export default function WaitingServer () {
  return (
    <Box justifyContent="center" alignItems="center" display="flex" flexWrap="wrap" height="100vh">
      <CircularProgress />
      <Box width="100%" textAlign="center" alignSelf="flex-start">
        Conectando-se ao servidor...
      </Box>
    </Box>
  )
}

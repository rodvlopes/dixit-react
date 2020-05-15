/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography }
  from '@material-ui/core'
import PersonIcon from '@material-ui/icons/AccountCircle'

export default function WaitingListeners ({ players }) {
  const info = 'Aguardando os jogadores a selecionarem a carta:'

  return (
    <>
      <Box justifyContent="center" alignItems="center" textAlign="center" display="flex" height="20vh">
        <Typography>{info}</Typography>
      </Box>
      <Box justifyContent="center" alignItems="center" textAlign="center" display="flex">
        <List>
          {players.map(p =>
            <ListItem key={p.index}>
              <ListItemIcon>
                <PersonIcon style={{ color: p.color }} />
              </ListItemIcon>
              <ListItemText primary={p.name} />
            </ListItem>
          )}
        </List>
      </Box>
    </>
  )
}

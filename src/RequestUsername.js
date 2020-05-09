/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { Button, Box, TextField } from '@material-ui/core'
import { assignColorToPlayer } from './store/actions'
import { connect } from 'react-redux'

function RequestUsernamePresentational ({ logUserIn, players }) {
  const [name, setName] = React.useState(null)
  const [isRoomFull, setRoomFull] = React.useState(false)
  const onlinePlayersNum = players.filter(p => p.name).length

  function handleSubmit (event) {
    event.preventDefault()
    const isNotRelogin = !players.find(p => p.name === name.toUpperCase())

    if (onlinePlayersNum > 5 && isNotRelogin) {
      setRoomFull(true)
    } else {
      logUserIn(name)
    }
  }

  if (isRoomFull) {
    return (
      <>
        <Box justifyContent="center" alignItems="center" display="flex" height="50vh">
          SALA LOTADA!
        </Box>
        <Box justifyContent="center" alignItems="center" display="flex">
          <Button variant="contained" color="primary" size="large"
            onClick={e => (document.location = '/')}>
            Deseja criar uma nova sala?
          </Button>
        </Box>
      </>
    )
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box justifyContent="center" alignItems="center" display="flex" height="60vh">
        <TextField
          label="Nome/Apelido"
          variant="outlined"
          helperText="Escolha um nome bem curto."
          onChange={ e => setName(event.target.value) }
        />
      </Box>
      <Box justifyContent="center" alignItems="center" display="flex">
        <Button type="submit" variant="contained" color="primary" size="large">
          Entrar
        </Button>
      </Box>
      <Box justifyContent="center" alignItems="center" display="flex">
        Jogadores presente nesta sala: {onlinePlayersNum} de 6.
      </Box>
    </form>
  )
}

const mapStateToProps = state => ({
  players: state.game.players
})

const mapDispatchToProps = dispatch => ({
  logUserIn: (name) => {
    dispatch(assignColorToPlayer(name))
  }
})

const RequestUsername = connect(mapStateToProps, mapDispatchToProps)(RequestUsernamePresentational)
export default RequestUsername

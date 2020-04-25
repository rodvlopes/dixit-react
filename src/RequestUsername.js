/* eslint 'react/prop-types' : 0 */
import React from 'react'
import { Button, Box, TextField } from '@material-ui/core'
import { assignColorToPlayer } from './store/actions'
import { connect } from 'react-redux'

function RequestUsernamePresentational ({ logUserIn }) {
  const [name, setName] = React.useState(null)

  function handleSubmit (event) {
    event.preventDefault()
    logUserIn(name)
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
        <Button type="submit"
          variant="contained"
          color="primary"
          size="large">
          Entrar
        </Button>
      </Box>
    </form>
  )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  logUserIn: (name) => {
    dispatch(assignColorToPlayer(name))
  }
})

const RequestUsername = connect(mapStateToProps, mapDispatchToProps)(RequestUsernamePresentational)
export default RequestUsername

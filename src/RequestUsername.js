/* eslint 'react/prop-types' : 0 */
import React from "react";
import { Button, Box, TextField } from "@material-ui/core";
import { assignColorToPlayer } from "./store/actions";
import { connect } from "react-redux";

function RequestUsernamePresentational({ logUserIn, players }) {
  const [name, setName] = React.useState(null);
  const [nameInvalid, setNameInvalid] = React.useState(true);
  const [isRoomFull, setRoomFull] = React.useState(false);
  const onlinePlayersNum = players.filter((p) => p.name).length;

  function enterRoom(event) {
    event.preventDefault();
    const shortName = name.substr(0, 4);
    const isNotRelogin = !players.find((p) => p.name === shortName);

    if (onlinePlayersNum > 5 && isNotRelogin) {
      setRoomFull(true);
    } else {
      logUserIn(shortName);
    }
  }

  function onChange(name) {
    setNameInvalid(name.length === 0 || name.length > 4);
    setName(name.toUpperCase());
  }

  if (isRoomFull) {
    return (
      <>
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          height="50vh"
        >
          SALA LOTADA!
        </Box>
        <Box justifyContent="center" alignItems="center" display="flex">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={(e) => (document.location = "/")}
          >
            Deseja criar uma nova sala?
          </Button>
        </Box>
      </>
    );
  }

  return (
    <form noValidate autoComplete="off" onSubmit={enterRoom}>
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        height="60vh"
      >
        <TextField
          label="Nome/Apelido"
          variant="outlined"
          size="medium"
          value={name || ""}
          helperText={
            nameInvalid ? "Escolha um nome com até 4 caracteres." : null
          }
          error={nameInvalid}
          onChange={(e) => onChange(event.target.value)}
          style={{ width: "270px" }}
        />
      </Box>
      <Box justifyContent="center" alignItems="center" display="flex">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={nameInvalid}
        >
          Entrar
        </Button>
      </Box>
      <Box justifyContent="center" alignItems="center" display="flex">
        Jogadores presente nesta sala: {onlinePlayersNum} de 6.
      </Box>
    </form>
  );
}

const mapStateToProps = (state) => ({
  players: state.game.players,
});

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (name) => {
    dispatch(assignColorToPlayer(name));
  },
});

const RequestUsername = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestUsernamePresentational);
export default RequestUsername;

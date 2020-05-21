/* eslint 'react/prop-types' : 0 */
import React from "react";
import { Button, Box, TextField } from "@material-ui/core";
import { assignColorToPlayer } from "./store/actions";
import { connect } from "react-redux";
import i18n from "./i18n";

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
          {i18n("FullRoom")}
        </Box>
        <Box justifyContent="center" alignItems="center" display="flex">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={(e) => (document.location = "/")}
          >
            {i18n("WantToCreateNewRoom?")}
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
          label={i18n("Nickname")}
          variant="outlined"
          size="medium"
          value={name || ""}
          helperText={nameInvalid ? i18n("NameShouldBeUpTo4CharsLong") : null}
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
          {i18n("Enter")}
        </Button>
      </Box>
      <Box justifyContent="center" alignItems="center" display="flex">
        {i18n("NumOfPlayerInRoom", onlinePlayersNum)}
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

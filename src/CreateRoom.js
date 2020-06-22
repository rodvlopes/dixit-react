/* eslint 'react/prop-types' : 0 */
import React, { useState } from "react";
import {
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import {
  expansionConf,
  composeRoomExpansion,
  defaultExpansion,
  generateSimpleId,
} from "./store/helper";
import i18n from "./i18n";

export default function CreateRoom() {
  const [expansion, setExpansion] = useState(defaultExpansion);

  const onClick = (e) => {
    const id = `${generateSimpleId()}`;
    const roomId = composeRoomExpansion(id, expansion);
    document.location.search = `?room=${roomId}`;
  };

  /* It's no required to set room on the store because of the hashchange listener will do */

  return (
    <Box
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      display="flex"
      height="80vh"
      style={{ placeContent: "space-evenly" }}
    >
      <PickExpansion expansion={expansion} setExpansion={setExpansion} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onClick}
      >
        {i18n("CreateRoom")}
      </Button>
    </Box>
  );
}

function PickExpansion({ expansion, setExpansion }) {
  const handleChange = (event) => {
    setExpansion(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{i18n("CardSetSelection")}</FormLabel>
      <RadioGroup
        aria-label="expansion"
        value={expansion}
        onChange={handleChange}
      >
        {Object.values(expansionConf).map(({ key, name }) => (
          <FormControlLabel
            key={key}
            value={key}
            control={<Radio />}
            label={name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

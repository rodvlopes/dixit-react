/* eslint 'react/prop-types' : 0 */
import React from "react";
import { Button, Box } from "@material-ui/core";
import { generateSimpleId } from "./store/helper";
import i18n from "./i18n";

export default function CreateRoom() {
  const onClick = (e) => {
    const id = `${generateSimpleId()}`;
    document.location.search = `?room=${id}`;
  };

  /* It's no required to set room on the store because of the hashchange listener will do */

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      height="100vh"
    >
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

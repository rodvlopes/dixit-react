/* eslint 'react/prop-types' : 0 */
import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import i18n from "./i18n";

export default function WaitingServer() {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexWrap="wrap"
      height="100vh"
    >
      <CircularProgress />
      <Box width="100%" textAlign="center" alignSelf="flex-start">
        {i18n("WaitingServer")}
      </Box>
    </Box>
  );
}

/* eslint 'react/prop-types' : 0 */
import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/AccountCircle";
import i18n from "./i18n";

export default function WaitingListeners({ players }) {
  return (
    <>
      <Box
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        display="flex"
        height="20vh"
      >
        <Typography>{i18n("WaitingListenersToSelect")}</Typography>
      </Box>
      <Box
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        display="flex"
      >
        <List>
          {players.map((p) => (
            <ListItem key={p.index}>
              <ListItemIcon>
                <PersonIcon className={p.color} />
              </ListItemIcon>
              <ListItemText primary={p.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

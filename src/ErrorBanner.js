/* eslint 'react/prop-types' : 0 */
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { cleanError } from "./store/actions";
import i18n from "./i18n";

function ErrorBannerPresentational({ error, close }) {
  return error ? (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!error}
      autoHideDuration={8000}
      onClose={() => close()}
    >
      <Alert severity="warning">{i18n(error)}</Alert>
    </Snackbar>
  ) : null;
}

export default connect(
  (state) => ({
    error: state.game.error,
  }),
  (dispach) => ({
    close: () => dispach(cleanError()),
  })
)(ErrorBannerPresentational);

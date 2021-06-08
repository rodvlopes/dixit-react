import React from "react";
import ReactDom from "react-dom";
import Home from "./Home";
import ErrorBanner from "./ErrorBanner";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import StoreProvider from "./store"; // jogar pra dentro do store/index

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
        <ErrorBanner />
      </ThemeProvider>
    </StoreProvider>
  );
}

ReactDom.render(<App />, document.getElementById("root"));

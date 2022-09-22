import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import Container from "@mui/material/Container";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;

import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: "#eeeff2",
    },
    primary: {
      main: "#ffdd57",
    },
    neutral: {
      main: "#64748B",
    },
    button: {
      main: "#2196f3",
    },
    secondary: {
      main: "#eeeff2",
    },
    error: {
      main: red.A400,
    },
  },
});
export default theme;

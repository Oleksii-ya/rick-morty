import { createTheme } from '@mui/material/styles';

export const Colors = {
  primary: "#000",
  text: "#333333",
  bg: "#00CED1",
  progress: "#444444"
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary
    },
    background: {
      default: Colors.bg
    },
    text: {
      primary: Colors.text
    },
    progress: {
      main: Colors.progress
    }
  }
});

export default theme;

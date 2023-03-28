import { createTheme } from '@mui/material/styles';

export const Colors = {
  primary: "#000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary
    }
  }
});

export default theme;

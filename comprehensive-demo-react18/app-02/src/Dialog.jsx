import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { createTheme, ThemeProvider, useTheme, useThemeProps } from '@mui/material/styles';
import green from '@mui/material/colors/green';
import red from '@mui/material/colors/red';

const outertheme = createTheme({
  palette: {
    primary: green,
  },
});

const theme = createTheme({
  palette: {
    primary: red,
  },
});

function PrintThemeDetails() {
  const theme = useTheme();
  console.log('PrintThemeDetails theme', theme);
  return (
    <div>
      <h3>Theme Details</h3>
      <span style={{ color: theme.palette.primary.main }}>
        primary main: {theme.palette.primary.main}
      </span>
    </div>
  );
}

function DialogComponent() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <br/>
      <br/>
      <br/>
      <ThemeProvider theme={outertheme}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Open Dialog (outer)
        </Button>
        <PrintThemeDetails />
        <br/>
        <br/>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Open Dialog (new theme provider)
          </Button>
          <PrintThemeDetails />
          <br/>
          <br/>
        </ThemeProvider>
      </ThemeProvider>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dialog Example</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a dialog from the Material UI app rendered in a React <code>Portal</code>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
            Nice
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogComponent;

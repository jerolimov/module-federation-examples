import React from 'react';

import { Button, ThemeProvider as RootThemeProvider, useTheme as useRootTheme } from '@mui/material';
import Button2 from '@mui/material/Button';

import {
  createTheme as createStylesTheme,
  ThemeProvider as StylesThemeProvider,
  ThemeProviderProps,
  useTheme as useStylesTheme
} from '@mui/material/styles';

import {
  ThemeProvider as StylesThemeProviderThemeProvider,
} from '@mui/material/styles/ThemeProvider';

import red from '@mui/material/colors/red';

// import Page from '../Page';

function ThemeProvider({ theme, children }/*: ThemeProviderProps*/) {
  return (
    <RootThemeProvider theme={theme}>
      {/* <StylesThemeProvider theme={theme}> */}
        {children}
      {/* </StylesThemeProvider> */}
    </RootThemeProvider>
  );
}

function PrintThemeDetails() {
  const rootTheme = useRootTheme();
  const stylesTheme = useStylesTheme();
  console.log('PrintThemeDetails themes', rootTheme, stylesTheme);
  return (
    <div>
      <h3>Theme Details</h3>
      <div style={{ color: rootTheme.palette.primary.main }}>
        primary main: {rootTheme.palette.primary.main}
      </div>
      <div style={{ color: stylesTheme.palette.primary.main }}>
        primary main: {stylesTheme.palette.primary.main}
      </div>
    </div>
  );
}

const Dialog = React.lazy(() => import('app_02/Dialog'));

const theme = createStylesTheme({
  palette: {
    primary: red,
  },
});

const DialogPage = () => (
  <ThemeProvider theme={theme}>
    <div>
      <h1>Dialog Page</h1>
      <Button variant="contained" color="primary">hallo</Button>
      <Button2 variant="contained" color="primary">hallo</Button2>

      <div>
        {Button === Button2 ? 'same button' : 'different button'}
      </div>

      {/* <Page title="Dialog Demo"> */}

        <Button variant="contained" color="primary">hallo</Button>
        <PrintThemeDetails />
        <br/>

        <React.Suspense fallback="Loading Dialog...">

          <Button variant="contained" color="primary">hallo</Button>
          <PrintThemeDetails />
          <br/>

          <Dialog />
        </React.Suspense>

      {/* </Page> */}
    </div>
  </ThemeProvider>
);

export default DialogPage;

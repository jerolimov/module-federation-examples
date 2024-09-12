import React from 'react';
import { Button, Divider, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import green from '@mui/material/colors/green';

import Dialog from './Dialog';
import { HashRouter } from 'react-router-dom';
import Tabs from './Tabs';

const theme = createTheme({
  palette: {
    primary: green,
  },
});

// const Page = React.lazy(() => import('app_01/Page'));

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>

        <Button variant="contained" color="primary">A Button</Button>

        <React.Suspense fallback={null}>
          {/* <Page title="Material UI App"> */}
            <Typography variant="h6">Dialog Component</Typography>
            <Dialog />
            <Divider style={{ margin: '16px 0' }} />
            <Typography variant="h6">Tabs Component</Typography>
            <Tabs />
          {/* </Page> */}
        </React.Suspense>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;

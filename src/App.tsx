import React, { lazy, Suspense, } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainLayout from './layouts/main.layout';
import { ErrorBoundary } from './components/error-boundary';
import { Spinner } from './ui/spinner';

const MainPage = lazy(() => import('./pages/main/main.page'));
const ArticlePage = lazy(() => import('./pages/article/article.page'));

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1A232E', contrastText: '#FFFFFF' },
      secondary: { main: '#ECF0F6', contrastText: '#1A232E' },
      error: { main: '#F3494C' },
      warning: { main: '#FFCB65' },
      success: { main: '#12D3A5' },
      info: { main: '#EFEFF3', contrastText: '#212932' },
    },
    typography: {
      fontFamily: 'Noto Sans',
      body1: {
        color: '#212932',
        fontSize: "0.875rem",
        fontWeight: 500
      },
      body2: {
        color: '#4E5460',
        fontSize: "0.813rem",
      },
      h4: {
        fontWeight: 500
      },
      h5: {
        color: '#4E5460',
        fontWeight: 500
      }
    },
  },
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <MainLayout>
              <Routes>
                <Route path={"/"} element={<MainPage />} />
                <Route path={"/article"} element={<ArticlePage />} />
              </Routes>
            </MainLayout>
          </Suspense>
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}

export default App;

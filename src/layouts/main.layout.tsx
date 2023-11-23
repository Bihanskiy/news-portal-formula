import React from 'react';

import { AppFooter } from '../components/app-footer';
import { AppHeader } from '../components/app-header';

interface MainLayoutType {
  children: React.ReactNode;
}

const MainLayout = ({
  children
}: MainLayoutType): JSX.Element => (
  <div className="wrapper">
    <AppHeader />
    <main className="main">
      <div className="main__container">
        {children}
      </div>
    </main>
    <AppFooter />
  </div>
);

export default MainLayout;
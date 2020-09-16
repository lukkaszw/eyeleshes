import React from 'react';
import Header from '../Header';

const MainLayout = ({ children }) => {
  return ( 
    <>
      {children}
      <Header />
    </>
  );
}
 
export default MainLayout;
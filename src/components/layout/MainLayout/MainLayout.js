import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const MainLayout = ({ children }) => {
  return ( 
    <>
      {children}
      <Header />
      <Footer />
    </>
  );
}
 
export default MainLayout;
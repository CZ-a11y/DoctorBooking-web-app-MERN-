import React from "react";
import Footer from "../components/Footer/Footer";
import Router from "../routes/Router";
import Header from "../components/Header/Header";
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

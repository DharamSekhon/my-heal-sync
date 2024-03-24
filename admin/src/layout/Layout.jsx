import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

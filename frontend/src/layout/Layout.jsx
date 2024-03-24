import React from "react";
import { Analytics } from "@vercel/analytics/react"

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routers />
        <Analytics />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

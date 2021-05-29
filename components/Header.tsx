import Head from "next/head";
import React from "react";

const Header = () => (
  <Head>
    <title>Coding Challenge</title>
    <meta name="description" content="Coding challenge for REA" />
    <link rel="icon" href="/favicon.ico" />

    {/* Import material ui default icons and font for quick style wins */}
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </Head>
);

export default Header;

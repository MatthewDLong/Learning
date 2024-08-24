import React from "react";
import Head from "next/head";

import App from "../components/app/App";

const Page = () => {
  return (
    <>
      <Head>
        <title>Cheap Car Hire, Compare Rental Prices - Rentalcars.com</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans|Ubuntu:500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <App />
    </>
  );
};

export default Page;

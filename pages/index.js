import axios from "axios";
import Head from "next/head";
import React from "react";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";

export default function Home({ productList }) {
  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featured />
      <ProductList productList={productList} />
    </React.Fragment>
  );
}

export const getServerSideProps = async () => {
  const reply = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      productList: reply.data,
    },
  };
};

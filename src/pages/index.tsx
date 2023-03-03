import Head from "next/head";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";
import HomePage from "@/components/home/HomePage";

const inter = Inter({ subsets: ["latin"] });

interface props {
  data: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
}

const Home = ({ data }: props) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage data={data} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { events_categories } = await import("../data/data.json");

  return {
    props: {
      data: events_categories,
    },
  };
};

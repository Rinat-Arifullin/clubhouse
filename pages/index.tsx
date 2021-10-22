import type { NextPage } from "next";
import Head from "next/head";
import { WelcomeStep } from "../components/steps/WelcomeStep";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>
      <WelcomeStep />
    </div>
  );
};

export default Home;

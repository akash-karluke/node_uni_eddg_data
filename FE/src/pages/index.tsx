import Head from "next/head";
import LandingIntro from "@/components/landingPage/LandingIntro";
import LandingCards from "@/components/landingPage/LandingCards";
import { useAppSelector } from "@/helper/hooks";

export default function Home(): JSX.Element {
  const { user } = useAppSelector((store) => store.user);

  return (
    <>
      <Head>
        <title>Eddgie UL App</title>
        <meta
          name="description"
          content="Everyday Data Driven Great Integrated Execution"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="landing-wrapper container">
        <LandingIntro user={user} />
        <LandingCards />
      </main>
    </>
  );
}

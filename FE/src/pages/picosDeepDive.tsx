import Head from "next/head";

import dynamic from "next/dynamic";
export default function ReportEmbed(): JSX.Element {
  const ReportEmbed = dynamic(
    () =>
      import("../components/powerBI/index").then(
        (ReportEmbed) => ReportEmbed.default
      ),
    {
      loading: () => <p>Loading...</p>,
    }
  );

  return (
    <>
      <Head>
        <title>Picos Deep Dive</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReportEmbed url="picosDeepDive" />
    </>
  );
}

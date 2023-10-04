import FeedbackForm from "@/components/FeedbackForm";
import { Typography } from "antd";
import Head from "next/head";

export default function Feedback(): JSX.Element {
  return (
    <>
      <Head>
        <title>Feedback | Eddgie</title>
        <meta
          name="feedback"
          content="We aim to help you get the best results when working with Eddgie. Please let us know what we can improve."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="blue-header section-wrapper">
        <h1 style={{ fontSize: "27px" }}>FEEDBACK</h1>
      </header>

      <FeedbackForm />
    </>
  );
}

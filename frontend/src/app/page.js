import Head from "next/head";
import Navbar from "./components/navbar";
import LandingPage from "./components/mainbody";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/favicon.ico" />
        <title>Welcome to Sort.dev</title>
        <meta name="description" content="use this project manager to sort an organize your practice\learning projects as a student developer" />
      </Head>
      <main className="flex flex-col min-h-screen bg-gray-800 text-white">
        <Navbar />
        <LandingPage />
      </main>
    </>
  );
}

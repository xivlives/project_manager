import Navbar from "./components/navbar";
import LandingPage from "./components/mainbody";
// import Footer from "./components/landingPage/footer";
// import FeaturesSection from "./components/landingPage/features";
// import CoFounders from "./components/landingPage/cofounders";




export default function Home() {
  return (
    <>
    <main className="flex flex-col min-h-screen bg-gray-800 text-white">
  <Navbar />
    <LandingPage />
    {/* <FeaturesSection />
    <CoFounders />
  <Footer /> */}
</main>

    </>
  );
}

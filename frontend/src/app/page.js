import Link from "next/link";
import Navbar from "./components/navbar";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-800 dark:text-white">
        <h1 className="text-7xl font-bold">Welcome to Your Personal Project Manager</h1>
        <div className="auth-buttons">
          <Link href="/auth/login">
            <button>Login</button>
          </Link>
          <Link href="/auth/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

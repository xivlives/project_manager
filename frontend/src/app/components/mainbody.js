import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-36 dark:bg-gray-800 dark:text-white">
        <h1 className="text-5xl font-bold">
          Welcome to Your Personal Project Manager
        </h1>
        <p className="text-2xl my-2 px-6 rounded">
          as a student developer, this tool helps you organise and track progress
          on the various projects that you have.
        </p>
        <div className="flex flex-row space-x-4 text-black text-center font-bold my-10 px-6 py-3 rounded">
          <Link href="/auth/login">
            <button className="bg-gray-500 px-6 py-3 rounded transform transition-transform duration-500 hover:scale-105">
              Login
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="bg-gray-500 px-6 py-3 rounded text-gray-300 transform transition-transform duration-500 hover:scale-105 dark:bg-slate-600">
              Sign Up
            </button>
          </Link>
          <Link href={"/projects"}>
            <button className="bg-gray-500 px-6 py-3 rounded text-gray-300 transform transition-transform duration-500 hover:scale-105 dark:bg-slate-600">
              projects
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

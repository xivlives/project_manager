"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { loginUser, signupUser, isLoggedIn } from "../../services/authService";

const AuthForm = () => {
  const pathname = usePathname(); // Get the current route
  const [mode, setMode] = useState("login"); // Manage login/signup mode
  const [fullName, setFullName] = useState(""); // Full name for signup
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Sync `mode` with the current route
  useEffect(() => {
    if (pathname === "/auth/signup") {
      setMode("signup");
    } else if (pathname === "/auth/login") {
      setMode("login");
    }
  }, [pathname]);

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = isLoggedIn();
        if (loggedIn) {
          router.push("/projects"); // Redirect to projects page if user is logged in
        }
      } catch (err) {
        console.error("Error checking login status", err);
      }
    };

    checkLoginStatus();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        await loginUser({ email, password });
        router.push("/projects"); // Redirect to projects page on successful login
      } else if (mode === "signup") {
        // Pass full name during signup
        await signupUser({ fullName, username, email, password });

        // Redirect to login page after successful signup
        router.push("/auth/login");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  // Toggle between login and signup modes
  const toggleMode = () => {
    const newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
    setFullName(""); // Clear full name when switching back to login
    setError(""); // Clear any existing errors

    // Update the URL dynamically
    router.push(newMode === "signup" ? "/auth/signup" : "/auth/login");
  };

  return (
    <div className="bg-slate-400 rounded w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center p-10">
      <h2 className="text-3xl font-bold text-center mb-3">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <>
            <input
              className="mb-4 p-2 rounded"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              className="mb-4 p-2 rounded"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </>
        )}
        <input
          className="mb-4 p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="mb-4 p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-slate-700 text-white p-2 rounded" type="submit">
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <div className="mt-4 text-center">
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <span className="text-blue-800 cursor-pointer" onClick={toggleMode}>
              Create one
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span className="text-blue-800 cursor-pointer" onClick={toggleMode}>
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

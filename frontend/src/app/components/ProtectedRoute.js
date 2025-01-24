import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/services/authService";
import LoadSpinner from "./LoadSpinner";

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isLoggedIn();
      if (!loggedIn) {
        router.push("/auth/login");
      } else {
        setAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (!authenticated) {
    return (
        <div className="flex justify-center items-center h-screen">
            <LoadSpinner />
        </div>
    ); // Optionally, show a loading spinner or placeholder
  }

  return children;
};

export default ProtectedRoute;

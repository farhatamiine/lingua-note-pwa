import { Navigate } from "react-router-dom";
import { UserAuth } from "@/context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = UserAuth();
  console.log(session);

  if (session === undefined) {
    // Auth state still loading
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!session) {
    // No session: redirect to login
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>; // Authenticated: render protected content
};

export default PrivateRoute;

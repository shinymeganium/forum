import { Navigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

type Props = { children: React.ReactNode };

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isLoading = useAuthStore(state => state.isLoading);

  if (isLoading)
    return <div>Loading...</div>;

  if (!isAuthenticated)
    return <Navigate to="/login" replace />;

  return children;
}
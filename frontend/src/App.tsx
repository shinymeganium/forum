import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { restoreSession } from "./api/profileApi";
import FrontPage from "./pages/FrontPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ThreadViewPage from "./pages/ThreadViewPage";
import CreateThreadPage from "./pages/CreateThreadPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  useEffect(() => {
    const restore = async () => await restoreSession();
    restore();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />

      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
        } />

      <Route path="/threads/:id" element={<ThreadViewPage />} />

      <Route path="/create" element={
        <ProtectedRoute>
          <CreateThreadPage />
        </ProtectedRoute>
      } />

      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

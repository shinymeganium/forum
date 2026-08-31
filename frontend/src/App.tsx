import { Route, Routes } from "react-router";
import FrontPage from "./pages/FrontPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ThreadViewPage from "./pages/ThreadViewPage";
import CreateThreadPage from "./pages/CreateThreadPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/" element={<ProfilePage />} />
      <Route path="/" element={<ThreadViewPage />} />
      <Route path="/" element={<CreateThreadPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

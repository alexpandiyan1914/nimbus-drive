import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DrivePage from "./pages/DrivePage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<MainLayout />}>
        <Route path="/drive" element={<DrivePage />} />
      </Route>

    </Routes>

  );
}

export default App;
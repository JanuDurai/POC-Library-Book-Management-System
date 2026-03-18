import { Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PrivateRoutes from "./route/protectedRoute";
function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<HomePage />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="register" element={<RegisterPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

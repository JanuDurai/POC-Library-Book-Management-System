import { Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from './Pages/HomePage';
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PrivateRoutes from "./route/protectedRoute";
import BookViewPage from "./Pages/bookViewPage";
import CartPage from "./Pages/CartPage";
function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/book/details/:id" element={<BookViewPage />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

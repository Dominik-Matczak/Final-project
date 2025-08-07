import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Basket from "./pages/Basket";
import OrderSuccess from "./pages/OrderSuccess";
import NoPage from "./routes/NoPage";
import Layout from "./layouts/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="basket" element={<Basket />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

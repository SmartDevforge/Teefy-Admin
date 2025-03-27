import { Route, Routes } from "react-router-dom";
import Dashboard from "./Routes/dashboard";
import Login from "./Components/login/Login";
import Products from "./Routes/products";
import Customer from "./Routes/customers";
import Order from "./Routes/order";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customer />} />
      </Routes>
    </>
  );
}

export default App;

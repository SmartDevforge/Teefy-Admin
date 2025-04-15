import { Route, Routes } from "react-router-dom";
import Dashboard from "./Routes/dashboard";
import Login from "./Components/login/Login";
import Products from "./Routes/products";
import Customer from "./Routes/customers";
import Order from "./Routes/order";
import Inventory from "./Routes/Inventory";
import PrivateRoute from "./PrivateRoute"; 
import Profile from "./Routes/Profile";

function App() {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/orders" element={<PrivateRoute element={<Order />} />} />
        <Route path="/products" element={<PrivateRoute element={<Products />} />} />
        <Route path="/customers" element={<PrivateRoute element={<Customer />} />} />
        <Route path="/inventory" element={<PrivateRoute element={<Inventory />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />}/>} />
      </Routes>
    </div>
  );
}

export default App;

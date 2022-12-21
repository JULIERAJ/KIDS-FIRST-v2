import { BrowserRouter, Routes, Route } from "react-router-dom"; 

import Home from "./pages/Home"; 
import Signin from "./pages/Signin"; 
import Register from "./pages/Register";
import Family from "./pages/Family";
import Member from "./pages/Member";
import Dashboard from "./pages/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";

const App = () => (
  <BrowserRouter>
    <Routes> 
      <Route> 
        <Route path="/" element={<Home />} /> 
        <Route path="/signin" element={<Signin />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/family" element={<Family />} /> 
        <Route path="/member" element={<Member />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forget" element={<ForgetPassword />} /> 
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

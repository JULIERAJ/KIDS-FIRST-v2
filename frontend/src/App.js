import {Routes, Route} from "react-router-dom"; 
import Home from "./components/Home"; 
import Signin from "./components/Signin"; 
import Register from "./components/Register";
import Family from "./components/Family";
import Member from "./components/Member";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route> 
          <Route path="/" element = {<Home />} /> 
          <Route path="/signin" element = {<Signin />} /> 
          <Route path="/register" element = {<Register />} /> 
          <Route path="/family" element = {<Family />} /> 
          <Route path="/member" element = {<Member />} /> 
          <Route path="/dashboard" element = {<Dashboard />} /> 

        </Route>
      </Routes>
    </div>
  );
}

export default App;

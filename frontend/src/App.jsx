import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Activate from './pages/Activate';
import Dashboard from './pages/Dashboard';
import Family from './pages/Family';
import ForgetPassword from './pages/ForgetPassword';
import Home from './pages/Home';
import Member from './pages/Member';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Signin from './pages/Signin';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/activate/:email/:emailVerificationToken'
          element={<Activate />}
        />
        <Route path='/family' element={<Family />} />
        <Route path='/member' element={<Member />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route
          path='/resetPassword/:email/:resetPasswordToken'
          element={<ResetPassword />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

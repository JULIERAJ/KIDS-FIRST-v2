import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingLayout from './components/LandingLayout';
import Activate from './pages/Activate/Activate';
import Conversation from './pages/Chat/Conversation';
import Dashboard from './pages/Dashboard';
import Family from './pages/Family';
import FeaturesPage from './pages/FeaturesPage';
import ForgetPassword from './pages/ForgetPassword';
import Home from './pages/Home';
// import Member from './pages/Member';
import FinalPanel from './pages/Panels/FinalPanel';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Signin from './pages/Signin';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path='/features' element={<FeaturesPage />} />
        </Route>
        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/activate/:email/:emailVerificationToken'
          element={<Activate />}
        />
        <Route path='/family' element={<Family />} />
        <Route path='/member' element={<FinalPanel />} />
        {/* <Route path='/panels' element={<FinalPanel />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route
          path='/resetPassword/:email/:resetPasswordToken'
          element={<ResetPassword />}
        />
        {/* <Route path='/sidebar' element={<Sidebar />} /> */}
        <Route path='/chat' element={<Conversation />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

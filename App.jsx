import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { EventProvider } from './components/Calendar/EventContext';
import KFCalendar from './components/Calendar/KFCalendar';
import EventModal from './components/EventModal/EventModal';
import LandingLayout from './components/LandingLayout';
import Sidebar from './components/Sidebar/Sidebar';
import Activate from './pages/Activate/Activate';
import Dashboard from './pages/Dashboard';
// import Family from './pages/Family';
import FeaturesPage from './pages/FeaturesPage';
import ForgetPassword from './pages/ForgetPassword';
import Home from './pages/Home';
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
        <Route path='/register/:email/:family/:emailVerificationToken' element={<Register />} />
        <Route
          path='/activate/:email/:emailVerificationToken'
          element={<Activate />}
        />
        {/* <Route path='/family' element={<Family />} /> */}
        <Route path='/member' element={<FinalPanel />} /> 
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/calendarview' element={<EventProvider><KFCalendar /></EventProvider>} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route
          path='/reset-password/:email/:resetPasswordToken'
          element={<ResetPassword />}
        />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path="/eventmodal" element={<EventModal />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

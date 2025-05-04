import './App.css';
import Layout from './components/navbar/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import AuthPage from './pages/session/Auth';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import HostAuthPage from './pages/hostSession/Auth';
import ParticipantDashboard from './pages/dashboard/Participant';
import HackathonDetailPage from './pages/hackathon/HackathonDetailPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Auth" element={<AuthPage />} />
      <Route path="/host-auth" element={<HostAuthPage/>} />
        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/dashboard" element={<ParticipantDashboard/>}/>
          <Route path="/hackathon/:id" element={<HackathonDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
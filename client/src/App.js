import './App.css';
import Layout from './components/navbar/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import AuthPage from './pages/session/Auth';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
  return (

    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/profile" element={<ProfilePage />} />
        
      </Routes>
      </Layout>
    </BrowserRouter>

  );
}

export default App;

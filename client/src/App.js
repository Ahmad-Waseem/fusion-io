import './App.css';
import StickyNavbar from './components/navbar/StickyNavbar';
import AuthPage from './pages/session/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <StickyNavbar /> */}
        <Routes>
          {/* Define your route for the Auth page */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

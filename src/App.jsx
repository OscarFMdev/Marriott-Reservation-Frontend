import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import SignUpPage from './pages/SignUpPage';
import Roomspage from './pages/Roomspage';

import './App.css';

const App = () => (
  <main className="App">
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/rooms" element={<Roomspage />} />
    </Routes>
  </main>

);

export default App;

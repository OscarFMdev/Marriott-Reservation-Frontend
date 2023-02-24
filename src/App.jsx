import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Roomspage from './pages/Roomspage';
import Reservationspage from './pages/Reservationspage';
import './App.css';

const App = () => (
  <main className="App">
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/rooms" element={<Roomspage />} />
      <Route path="/reservation" element={<Reservationspage />} />
    </Routes>
  </main>

);

export default App;

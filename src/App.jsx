import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Roomspage from './pages/Roomspage';
import Bookingpage from './pages/Bookingpage';
import './App.css';
import MyBookingspage from './pages/Mybookingspage';  // eslint-disable-line
import AddRoompage from './pages/AddRoompage';
import DeleteRoompage from './pages/DeleteRoompage';

const App = () => (
  <main className="App">
    {window.location.pathname !== '/' && <Navbar />}
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/rooms" element={<Roomspage />} />
      <Route path="/booking" element={<Bookingpage />} />
      <Route path="/mybookings" element={<MyBookingspage />} />
      <Route path="/addroom" element={<AddRoompage />} />
      <Route path="/deleteroom" element={<DeleteRoompage />} />
    </Routes>
  </main>
);

export default App;

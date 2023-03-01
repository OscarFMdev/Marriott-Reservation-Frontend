import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Roomspage from './pages/Roomspage';
import Bookingpage from './pages/Bookingpage';
import './App.css';
import MyBookingspage from './pages/MyBookingspage';
import AddRoompage from './pages/AddRoompage';
import DeleteRoompage from './pages/DeleteRoompage';

const App = () => (
  <div className="container">
    <div className="sidebar">
      {window.location.pathname !== '/' && <Navbar />}
    </div>
    <main className="content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/rooms" element={<Roomspage />} />
        <Route path="/booking" element={<Bookingpage />} />
        <Route path="/mybookings" element={<MyBookingspage />} />
        <Route path="/addroom" element={<AddRoompage />} />
        <Route path="/deleteroom" element={<DeleteRoompage />} />
      </Routes>
    </main>
  </div>
);

export default App;

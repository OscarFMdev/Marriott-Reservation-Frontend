import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Loginpage from './pages/Loginpage';
import SignUpPage from './pages/SignUpPage';
import Roomspage from './pages/Roomspage';
import Homepage from './pages/Homepage';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../node_modules/primeflex/primeflex.css';
import Bookingpage from './pages/Bookingpage';
import ProtectRoutes from './components/ProtectRoutes';
import './App.css';
import MyBookingspage from './pages/MyBookingspage';
import AddRoompage from './pages/AddRoompage';
import DeleteRoompage from './pages/DeleteRoompage';
import { fetchRooms } from './redux/roomSlice';
import Carousel from './components/Carousel';
import Details from './components/Details';

const App = () => {
  const dispatch = useDispatch();
  dispatch(fetchRooms());
return (
  <div className="container">
    <div className="sidebar">
      {window.location.pathname !== '/' && <Navbar />}
    </div>
    <main className="content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/rooms" element={<Roomspage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route element={<ProtectRoutes />}>
          <Route path="/booking" element={<Bookingpage />} />
          <Route path="/mybookings" element={<MyBookingspage />} />
          <Route path="/addroom" element={<AddRoompage />} />
          <Route path="/deleteroom" element={<DeleteRoompage />} />
        </Route>
      </Routes>
    </main>
  </div>

);
};

export default App;

import { useSelector } from 'react-redux';
import Carousel from './Carousel';
import stl from './componentsCss/Carousel.module.css';

const Rooms = () => {
  const rooms = useSelector((state) => state.rooms);
  if (rooms.loading) {
    return <i className="pi pi-spin pi-spinner" style={{ fontSize: '4rem' }} />;
  }
  return (
    <div className={stl.room_container}>
      <h2>Available Rooms</h2>
      <Carousel />
    </div>
  );
};

export default Rooms;

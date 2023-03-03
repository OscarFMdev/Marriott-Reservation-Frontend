import { useSelector } from 'react-redux';
import Carousel from './Carousel';

const Rooms = () => {
  const rooms = useSelector((state) => state.rooms);
  if (rooms.loading) {

    return <i className="pi pi-spin pi-spinner" style={{ fontSize: '4rem' }}></i>

  }
  if (rooms.error) {
      
      return <h1>{rooms.error}</h1>
  
    }
  return (
    <div>
      <Carousel />
    </div>
  );

  

  
};

export default Rooms;

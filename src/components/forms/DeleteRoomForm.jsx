import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, PopRoom, fetchRooms } from '../../redux/reducer/Rooms/roomSlice';
import dlt from '../componentsCss/Delete.module.css';

const DeleteRoomForm = () => {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, []);

  const handleSubmit = (id) => (e) => {
    e.preventDefault();
    dispatch(deleteRoom(id));
    dispatch(PopRoom(id));
  };

  return (
    <div>
      <h1>Delete Rooms</h1>
      <div className={dlt.bg}>
        {rooms.status === 'loading' && <h1>Loading...</h1>}
        {rooms.status === 'error' && <h1>{rooms.message}</h1>}
        {rooms.rooms.length === 0 && <h1>No Rooms</h1>}
        {rooms.rooms.map((room) => (
          <div key={room.id} className={dlt.container}>
            <img src={room.image} alt="" />
            <h3>{room.name}</h3>
            <button type="submit" onClick={handleSubmit(room.id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DeleteRoomForm;

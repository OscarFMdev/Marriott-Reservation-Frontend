import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, PopRoom, fetchRooms } from '../../redux/reducer/Rooms/roomSlice';

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
      {rooms.status === 'loading' && <h1>Loading...</h1>}
      {rooms.status === 'error' && <h1>{rooms.message}</h1>}
      {rooms.rooms.length === 0 && <h1>No Rooms</h1>}
      {rooms.rooms.map((room) => (
        <div key={room.id}>
          <h1>{room.name}</h1>
          <button type="submit" onClick={handleSubmit(room.id)}>Delete</button>
        </div>
      ))}

    </div>
  );
};

export default DeleteRoomForm;

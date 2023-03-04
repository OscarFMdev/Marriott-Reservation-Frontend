import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, PopRoom } from '../../redux/reducer/Rooms/roomSlice';

const DeleteRoomForm = () => {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  const handleSubmit = (id) => (e) => {
    e.preventDefault();
    dispatch(deleteRoom(id));
    dispatch(PopRoom(id));
  };

  return (
    <div>
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

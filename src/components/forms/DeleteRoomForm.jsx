import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, PopRoom, fetchRooms } from '../../redux/reducer/Rooms/roomSlice';
import table from '../TableStyles.module.css';

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
    <main className={table.container}>
      {rooms.status === 'loading' && <h1>Loading...</h1>}
      {rooms.status === 'error' && <h1>{rooms.message}</h1>}
      {rooms.rooms.length === 0 && <h1>No Rooms</h1>}
      <h1>Delete Rooms</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.rooms.length === 0 ? (
            <tr>
              <td colSpan="3">You have no rooms</td>
            </tr>
          ) : (
            rooms.rooms.map((room) => (
              <tr key={room.id}>
                <td>
                  <img src={room.image} alt="hotel room" className={table.roomImage} />
                </td>
                <td>{room.name}</td>
                <td>
                  <button type="button" onClick={handleSubmit(room.id)} className={table.deleteCancelBtn}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </main>
  );
};

export default DeleteRoomForm;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import {
  deleteRoom,
  PopRoom, fetchRooms,
  setMessageEmpty,
} from '../../redux/reducer/Rooms/roomSlice';
import table from '../componentsCss/TableStyles.module.css';

const DeleteRoomForm = () => {
  const rooms = useSelector((state) => state.rooms);
  const { status, message } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  const handleMessage = () => {
    setTimeout(() => {
      if (message === 'Room Deleted Successfully') dispatch(setMessageEmpty(''));
    }, 3000);
  };

  useEffect(() => {
    dispatch(fetchRooms());
    handleMessage();
  }, [message]);

  const handleSubmit = (id) => (e) => {
    e.preventDefault();
    dispatch(deleteRoom(id));
    dispatch(PopRoom(id));
  };

  if (status === 'loading') {
    return <ProgressSpinner className="progressSpinner" />;
  }

  return (
    <main className={table.container}>
      {rooms.status === 'loading' && <h1>Loading...</h1>}
      { !message ? null : <p className={table.success}>{message}</p>}
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

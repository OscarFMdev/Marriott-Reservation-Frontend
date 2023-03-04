import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import form from './Form.module.css';
import { deleteRoom, PopRoom } from '../../redux/reducer/Rooms/roomSlice';

const DeleteRoomForm = () => {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = e.target[0].value;

    dispatch(deleteRoom(id));
    dispatch(PopRoom());
  };

  return (
    <form onSubmit={handleSubmit} className={form.formContainer}>
      <div className={form.hotel} />
      <h1>Delete Room</h1>
      <select>
        <option>-- Select a room to delete --</option>
        {rooms.rooms.map((room) => (

          <option key={room.id} value={room.id}>
            {' '}
            {room.id}
            {' '}
            {room.name}
            {' '}
          </option>

        ))}
      </select>
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeleteRoomForm;

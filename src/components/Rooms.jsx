import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchRooms } from '../redux/reducer/roomSlice';



const Rooms = () => {
  const dispatch = useDispatch();
  dispatch(fetchRooms());
  return (
    <div>
      <h1>Rooms</h1>
    </div>
  );
};





export default Rooms;

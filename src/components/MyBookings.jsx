import React from 'react';
import { useSelector } from 'react-redux';

const MyBookings = () => {
  const { message } = useSelector((state) => state.reservations);

  return (
    <>
      <h1>My Bookings</h1>
      <p>{message}</p>
    </>
  );
};

export default MyBookings;

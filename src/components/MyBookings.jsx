import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings, deleteBooking, popBook } from '../redux/reducer/reservation/reservationSlice';

const MyBookings = () => {
  const { message, bookings } = useSelector((state) => state.reservations);
  const { rooms } = useSelector((state) => state.rooms);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCancleReservation = (id) => {
    const deleteBook = {
      id,
      userId: user.id,
    };
    dispatch(deleteBooking(deleteBook));
    dispatch(popBook(id));
  };

  useEffect(() => {
    dispatch(fetchBookings(user.id));
  }, []);

  return (
    <>
      <h1>My Bookings</h1>
      <p>{message}</p>
      { bookings.length === 0 ? <p>You have no bookings</p> : (
        bookings.map((booking) => (
          <div key={booking.id}>
            {rooms.map((room) => {
              if (booking.room_id === room.id) {
                return (
                  <div key={room.id}>
                    <p>
                      Room Name
                      {room.name}
                    </p>
                    <p>
                      Reservation Start Date
                      {booking.start_date}
                    </p>
                    <p>
                      Reservation End Date
                      {booking.end_date}
                    </p>
                  </div>
                );
              }
              return null;
            })}
            <button
              type="button"
              onClick={() => handleCancleReservation(booking.id)}
            >
              Cancel Reservation
            </button>

          </div>
        ))
      )}
    </>
  );
};

export default MyBookings;

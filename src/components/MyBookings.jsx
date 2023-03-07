import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings, deleteBooking, popBook } from '../redux/reducer/reservation/reservationSlice';
import mybookings from './TableStyles.module.css'

const MyBookings = () => {
  const { message, bookings } = useSelector((state) => state.reservations);
  const { rooms } = useSelector((state) => state.rooms);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCancelReservation = (id) => {
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

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [message]);

  return (
    <main className={mybookings.container}>
      <h1>My Bookings</h1>
      {showMessage && (
        <p className={ showMessage ? `${mybookings.success} ${mybookings.fadeIn}` : mybookings.fadeOut}>
          {message}
        </p>
      )}
      <table className=''>
      <thead>
        <tr>
          <th>Room Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length === 0 ? (
          <tr>
            <td colSpan="4">You have no bookings</td>
          </tr>
        ) : (
          bookings.map((booking) => (
            <tr key='hello' className='hello'>
              {rooms.map((room) => {
                if (booking.room_id === room.id) {
                  return (
                    <>
                      <td>{room.name}</td>
                      <td>{booking.start_date}</td>
                      <td>{booking.end_date}</td>
                    </>
                  );
                }
                return null;
              })}
              <td>
                <button
                  type="button"
                  onClick={() => handleCancelReservation(booking.id)}
                  className={mybookings.deleteCancelBtn}
                >
                  Cancel
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

export default MyBookings;

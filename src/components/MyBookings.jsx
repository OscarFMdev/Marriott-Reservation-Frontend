import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import { fetchBookings, deleteBooking, popBook } from '../redux/reducer/reservation/reservationSlice';
import { setMessageEmpty } from '../redux/reducer/Rooms/roomSlice';
import mybookings from './componentsCss/TableStyles.module.css';

const MyBookings = () => {
  const { status, message, bookings } = useSelector((state) => state.reservations);
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

  const handleMessage = () => {
    setTimeout(() => {
      if (message === 'Room Created Successfully') dispatch(setMessageEmpty(''));
    }, 3000);
  };

  useEffect(() => {
    handleMessage();
  }, [message]);

  if (status === 'loading') {
    return <ProgressSpinner />;
  }

  return (
    <main className={mybookings.container}>
      <h1>My Bookings</h1>
      {message && (
        <p className={message ? `${mybookings.success} ${mybookings.fadeIn}` : mybookings.fadeOut}>
          {message}
        </p>
      )}
      <table className="">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="4">You have no bookings</td>
            </tr>
          ) : (
            bookings.map(
              ({
                id: bookingId,
                start_date: startDate,
                end_date: endDate,
                room: {
                  name,
                },
              }) => (
                <tr key={bookingId} className="hello">
                  <>
                    <td>{name}</td>
                    <td>{startDate}</td>
                    <td>{endDate}</td>
                  </>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleCancelReservation(bookingId)}
                      className={mybookings.deleteCancelBtn}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ),
            )
          )}
        </tbody>
      </table>

    </main>
  );
};

export default MyBookings;

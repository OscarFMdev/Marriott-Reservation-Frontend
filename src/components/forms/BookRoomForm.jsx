import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { bookRoom, addBook } from '../../redux/reducer/reservation/reservationSlice';
import form from './Form.module.css';

function ReservationForm() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const { message, error } = useSelector((state) => state.reservations);
  const rooms = useSelector((state) => state.rooms.rooms);
  const [formData, setFormData] = useState({
    hotelId: params.id || '',
    startDate: '',
    endDate: '',
  });

  if (!user) navigate('/login');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const booking = {
      room_id: formData.hotelId,
      start_date: formData.startDate,
      end_date: formData.endDate,
    };

    const bookingObject = {
      booking,
      userId: user.id,
    };

    dispatch(bookRoom(bookingObject));
    dispatch(addBook(bookingObject));
  };

  const handleNavigation = () => {
    if (message === 'Room Booked Successfully') window.location.href = '/mybookings';
  };

  useEffect(() => {
    handleNavigation();
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className={form.formContainer}>
      <div className={form.hotel} />
      <h1 className={form.header}>Book a Marriott Hotel Room</h1>
      <p className={form.details}>
        Marriott is the largest hotel chain in the world.
        There are 3 room models in this Marriott Hotel: Single, Double and Suite.
        If you want to live the Marriott experience fill this form!
      </p>
      <p style={{ color: 'green' }}>{ !message ? null : message }</p>
      <p style={{ color: 'red' }}>{ !error ? null : error }</p>
      <div className={form.inputsContainer}>

        <div className={form.fieldBook}>
          <select
            id="hotelId"
            name="hotelId"
            value={formData.hotelId}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select a Room --</option>
            {params.id

              ? (

                <option value={params.id}>
                  {rooms.filter((room) => room.id === parseInt(params.id, 10))[0].name}
                </option>
              )

              : (

                rooms.map((room) => (

                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>

                ))
              )}

          </select>
        </div>
        <div className={form.fieldBook}>
          <label htmlFor="startDate">
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className={form.last}>
          <div className={form.fieldBook}>
            <label htmlFor="endDate">
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <button type="submit">Book now</button>
        </div>
      </div>
    </form>
  );
}

export default ReservationForm;

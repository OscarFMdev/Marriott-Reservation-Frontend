import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import form from './Form.module.css';

function ReservationForm() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    hotelId: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/rooms')
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookingData = {
      room_id: formData.hotelId,
      start_date: formData.startDate,
      end_date: formData.endDate,
    };
    fetch('http://127.0.0.1:3000/api/v1/users/6/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },

      body: JSON.stringify({ booking: bookingData }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    navigate('/mybookings');

  };

  return (
    <form onSubmit={handleSubmit} className={form.formContainer}>
      <div className={form.hotel} />
      <h1 className={form.header}>Book a Marriott Hotel Room</h1>
      <p className={form.details}>
        Marriott is the largest hotel chain in the world.
        There are 3 room models in this Marriott Hotel: Single, Double and Suite.
        If you want to live the Marriott experience fill this form!
      </p>
      <div className={form.inputsContainer}>

        <div className={form.fieldBook}>
          <select
            id="hotelId"
            name="hotelId"
            value={formData.hotelId}
            onChange={handleInputChange}
          >
            <option value="">-- Select a hotel --</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
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

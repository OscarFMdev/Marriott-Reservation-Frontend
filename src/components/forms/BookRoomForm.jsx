import { useState, useEffect } from 'react';
import form from './Form.module.css';

function ReservationForm() {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    hotelId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/rooms')
      .then(response => response.json())
      .then(data => setHotels(data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const bookingData = {
      room_id: formData.hotelId,
      start_date: formData.startDate,
      end_date: formData.endDate
    };
    fetch('http://127.0.0.1:3000/api/v1/users/6/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booking: bookingData })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className={form.formContainer}>
      <div className={form.fieldBook}>
        <label htmlFor="hotelId">Hotel:</label>
        <select
          id="hotelId"
          name="hotelId"
          value={formData.hotelId}
          onChange={handleInputChange}
        >
          <option value="">-- Select a hotel --</option>
          {hotels.map(hotel => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>
      <div className={form.fieldBook}>
        <label htmlFor="startDate">Start date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
        />
      </div>
      <div className={form.fieldBook}>
        <label htmlFor="endDate">End date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReservationForm;

import React, { useState } from 'react';
import form from './Form.module.css';

const AddRoomForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [roomType, setRoomType] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:3000/api/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        room: {
          name,
          image,
          description,
          price,
          room_type: roomType,
        },
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className={form.formContainer}>
      <h1>Add Room</h1>
      <div className={form.field}>
        <label htmlFor="name">
          Name:
        </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={form.field}>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <div className={form.field}>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className={form.field}>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className={form.field}>
        <label htmlFor="roomType">Room Type:</label>
        <select id="roomType" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="">-- Select a room type --</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
      </div>
      <button type="submit">Add Room</button>
    </form>
  );
};

export default AddRoomForm;

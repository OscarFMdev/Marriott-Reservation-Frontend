import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import form from './Form.module.css';
import { addRoom, NewRoom } from '../../redux/reducer/Rooms/roomSlice';

const AddRoomForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [roomType, setRoomType] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const room = {
      name,
      image,
      description,
      price,
      room_type: roomType,

    };
    dispatch(addRoom(room));
    dispatch(NewRoom(room));
    setName('');
    setImage('');
    setDescription('');
    setPrice('');
    setRoomType('');
  };

  return (
    <form onSubmit={handleSubmit} className={form.formContainer}>
      <div className={form.hotel} />
      <h1>Add Room</h1>

      <div className={form.inputsContainer}>

        <div className={form.field}>
          <label htmlFor="name">
            <input placeholder="Hotel room name" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div className={form.field}>
          <label htmlFor="image">
            <input placeholder="Image URL" type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
          </label>
        </div>
        <div className={form.field}>
          <label htmlFor="description">
            <textarea placeholder="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
        </div>
        <div className={form.field}>
          <label htmlFor="price">
            <input placeholder="Price" type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
        </div>
        <div className={form.field}>
          <label htmlFor="roomType">
            <select id="roomType" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="">-- Select a room type --</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </select>
          </label>
        </div>
        <button type="submit">Add Room</button>
      </div>
    </form>
  );
};

export default AddRoomForm;

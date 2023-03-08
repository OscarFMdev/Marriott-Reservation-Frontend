import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import form from './Form.module.css';
import { addRoom, NewRoom } from '../../redux/reducer/Rooms/roomSlice';

const AddRoomForm = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [roomType, setRoomType] = useState('');
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.rooms);

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

  const handleNavigation = () => {
    setTimeout(() => {
      if (message === 'Room Created Successfully') window.location.href = '/Rooms';
    }, 3000);
  };

  useEffect(() => {
    handleNavigation();
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className={form.formContainer}>
      <div className={form.hotel} />
      { !message ? null : <p className={form.success}>{message}</p>}
      <h1 className={form.header}>Add Room</h1>
      <p className={form.details}>
        {' '}
        Welcome! Help this page grow by adding new rooms.
        You can add a new room by completing the following form:
      </p>
      <p style={{ color: 'red' }}>{ !error ? null : error }</p>
      <div className={`${form.inputsContainer} ${form.center}`}>

        <div className={form.field}>
          <label htmlFor="name">
            <input placeholder="Hotel room name" type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div className={form.field}>
          <label htmlFor="image">
            <input placeholder="Image URL" type="text" id="image" value={image} required onChange={(e) => setImage(e.target.value)} />
          </label>
        </div>
        <div className={form.field}>
          <label htmlFor="description">
            <textarea placeholder="Description" id="description" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
        </div>
        <div className={form.field}>
          <label htmlFor="price">
            <input placeholder="Price" type="number" id="price" required min={50} value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
        </div>
        <div className={form.field}>
          <label htmlFor="roomType">
            <select id="roomType" value={roomType} required onChange={(e) => setRoomType(e.target.value)}>
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

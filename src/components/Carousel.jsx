import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { setMessageEmpty } from '../redux/reducer/Rooms/roomSlice';
import stl from './componentsCss/Carousel.module.css';
import dstl from './componentsCss/Details.module.css';

const Carousel = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const [current, setCurrent] = useState(0);
  const { message } = useSelector((state) => state.rooms);

  const { length } = rooms.rooms;

  const handleMessage = () => {
    setTimeout(() => {
      if (message === 'Room Created Successfully') dispatch(setMessageEmpty(''));
    }, 3000);
  };

  useEffect(() => {
    handleMessage();
  }, [message]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(rooms.rooms) || rooms.rooms.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <div className={stl.container}>
        <p style={{ color: 'green' }}>{ !message ? null : message }</p>
        {rooms.rooms.map((room, index) => (
          <div className={index === current ? '' : ''} key={room.id}>
            {index === current && (
            <div className="">
              <div className={stl.card}>
                <h2 className={stl.room_title}>{room.name}</h2>
                <p className="">{room.type}</p>
                <div className={stl.img_container}>
                  <Link to={`/Details/${room.name}`}>
                    <img src={room.image} alt="" />
                  </Link>
                </div>
              </div>
            </div>
            )}
          </div>
        ))}
        <div className={stl.action}>
          <Button icon="pi pi-chevron-left" onClick={prevSlide} className={dstl.btn_color} />
          <Button icon="pi pi-chevron-right" onClick={nextSlide} className={dstl.btn_color} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;

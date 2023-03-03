import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import stl from './componentsCss/Carousel.module.css';

const Carousel = () => {
  const rooms = useSelector((state) => state.rooms);
  const [current, setCurrent] = useState(0);
  const { length } = rooms.rooms;

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

        {rooms.rooms.map((room, index) => (
          <div className={index === current ? '' : ''} key={index}>
            {index === current && (

            <div className="">
              <div className={stl.card}>
                <h2 className={stl.room_title}>{room.name}</h2>
                <p className="">{room.type}</p>
                <div className={stl.img_container}>
                  <Link to={`/Details/${room.id}`}>
                  <img src={room.image} alt="" />
                </Link>
                </div>
              </div>
            </div>
            )}
          </div>
        ))}
        <div className={stl.action}>
          <Button icon="pi pi-chevron-left" onClick={prevSlide} />
          <Button icon="pi pi-chevron-right" onClick={nextSlide} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;

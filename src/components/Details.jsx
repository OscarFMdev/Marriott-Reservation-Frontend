import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import dstl from './componentsCss/Details.module.css';

const Details = () => {
  const params = useParams();
  const rooms = useSelector((state) => state.rooms);
  const room = rooms.rooms.find((r) => r.name === params.name);

  return (
    <div>
      <h1>Room&apos;s Details</h1>
      <div className={dstl.container}>
        <div>
          <div className={dstl.card_container}>
            <div className={dstl.flex1}>
              <img src={room.image} alt="" className={dstl.image} />
            </div>
            <div className={dstl.details}>

              <div>
                <h2>{room.name}</h2>
              </div>

              <div className={dstl.even}>
                <h4>Type:</h4>
                <p>
                  {room.room_type}
                </p>
              </div>

              <div>
                <h4>Description:</h4>
                <p>{room.description}</p>
              </div>

              <div className={dstl.even}>
                <h4>Price:</h4>
                <p>{room.price}</p>
              </div>
            </div>
          </div>
          <div className={dstl.btn}>

            <div className={dstl.btn_end_5}>
              <Link to={`/Booking/${room.id}`}>
                <button type="button" label="Reserve" className={dstl.btn_color}>Reserve</button>
              </Link>
            </div>
            <div className={dstl.btn_start}>
              <Link to="/rooms">
                <button type="button" label="Back" className={dstl.btn_color}>Back </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

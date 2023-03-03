import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const Details = () => {
  const params = useParams();
  const rooms = useSelector((state) => state.rooms);
  const room = rooms.rooms.find((r) => r.id === parseInt(params.id, 10));
  console.log(room);

  return (
    <div>
      <h1>{room.name}</h1>
      <p>
        {room.type}
        {' '}
      </p>
      <img src={room.image} alt="" />
      <p>{room.description}</p>
      <p>{room.price}</p>

      <Link to="/rooms">
        <button type="button">Back</button>
      </Link>
    </div>
  );
};

export default Details;

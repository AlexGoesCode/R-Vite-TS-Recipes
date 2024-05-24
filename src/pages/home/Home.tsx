import { useAppContext } from '../../context/AppContext';

const Home = () => {
  const { user } = useAppContext();

  return (
    <div>
      <h1>Welcome {user ? user : 'Guest'}</h1>
    </div>
  );
};

export default Home;

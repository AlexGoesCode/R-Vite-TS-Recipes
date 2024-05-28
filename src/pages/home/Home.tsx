import { useAppContext } from '../../context/AuthContext';

// consume the context
const Home = () => {
  const { user } = useAppContext();

  return (
    <div>
      <h1>Welcome {user ? user : 'Guest'}</h1>
    </div>
  );
};

export default Home;

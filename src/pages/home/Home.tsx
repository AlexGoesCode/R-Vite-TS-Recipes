import { useAuth } from '../../context/AuthContext';

// consume the context
const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome {user ? user : 'Guest'}</h1>
    </div>
  );
};

export default Home;

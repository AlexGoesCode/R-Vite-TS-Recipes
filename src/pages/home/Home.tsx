import { useAppContext } from '../../context/AppContext';

const Home = () => {
  const { user, setUser } = useAppContext();

  return (
    <div>
      <h1>Welcome {user ? user : 'Guest'}</h1>
      <button onClick={() => setUser('John Doe')}>Login as John Doe</button>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
};

export default Home;

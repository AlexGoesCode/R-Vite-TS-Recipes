import { useAuth } from '../../context/AuthContext';
import './Home.css';

// consume the context
const Home = () => {
  const { user } = useAuth();

  return (
    <div className='centered-container'>
      <div className='h1-container'>
        <h1>Welcome {user ? user : 'Guest'}</h1>
      </div>
      <div className='h2-container'>
        <h2>
          Flavours:<br></br>Dance!
        </h2>
      </div>
    </div>
  );
};

export default Home;

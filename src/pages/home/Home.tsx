import { useAuth } from '../../context/AuthContext';
import './Home.css';

// consume the context
const Home = () => {
  const { user } = useAuth();

  return (
    <div className='centered-container'>
      <div className='h1-container'>
        <h1>
          Welcome&nbsp;{user ? user.email : 'Guest'}
          ,&nbsp;please&nbsp;login&nbsp;first!
        </h1>
      </div>
      <div className='h2-container'>
        <h2>
          Flavours:
          <br />
          Dance!
        </h2>
      </div>
      <div className='home-container'>
        <div className='intro-block'>
          <h2>Dance with flavors!</h2>
          <p>
            Our website is your ultimate destination for discovering delicious,
            and easy-to-make recipes from around the world. Whether you're a
            seasoned chef or a beginner in the kitchen, our collection of
            recipes is designed to inspire and guide you on your culinary
            journey.
          </p>
        </div>
        <div className='philosophy-block'>
          <h2>Philosophy</h2>
          <p>
            Our philosophy is centered around the joy of cooking and the
            transformative power of food. We encourage you to dance with
            flavors, experiment with ingredients, and embrace the creativity
            that comes with preparing meals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

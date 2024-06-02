import './App.css';
import CustomNavbar from './components/custom-navbar/CustomNavbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Routes from './components/routes/Routes';
import Footer from './components/footer/Footer'; // Import the Footer component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='root'>
          <CustomNavbar />
          <div className='app'>
            <Routes />
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

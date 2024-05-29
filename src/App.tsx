import './App.css';
import CustomNavbar from './components/custom-navbar/CustomNavbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Routes from './components/routes/Routes';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar />
        <div className='app'>
          <Routes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

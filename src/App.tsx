import './App.css';
import CustomNavbar from './components/custom-navbar/CustomNavbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Routes from './components/routes/Routes';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='root'>
          <CustomNavbar />
          <div className='app'>
            <Routes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

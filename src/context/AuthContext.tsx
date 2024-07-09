import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import { auth } from '../../firebaseConfig';
import { UserType } from '../types/types';
import { useNavigate } from 'react-router-dom';

// Define the shape of the context state
interface AuthContextProps {
  user: UserType | null;
  error: string;
  setError: (error: string) => void;
  setUser: (user: UserType) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Create the initial context state
const ContextInit = {
  user: null,
  error: '',
  setUser: () => {
    throw new Error('Context not initialised');
  },
  setError: (error: string) => {
    throw new Error(`Context not initialised ${error}`);
  },
  login: (email: string, password: string) => {
    console.log(email, password);
    throw new Error('Context not initialised');
  },
  logout: () => {
    throw new Error('Context not initialised');
  },
};

// Create the context with a default undefined value
export const AuthContext = createContext<AuthContextProps>(ContextInit);

// Define the type for the provider's props
interface AuthProviderProps {
  children: ReactNode;
}

// Create the provider component
const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState(''); // error state

  // Get the user from Firebase
  const getUserFromFirebase = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const email = user.email!;
        setUser({ email: email, uid: uid }); // Fix: Include uid property in the user object
      } else {
        // User is signed out
        console.log('user is not logged in');
        setUser(null);
      }
    });
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        // authenticate the user w. email and pass
        auth,
        email,
        password
      );
      // Set the user object with email
      const user = {
        email: userCredential.user.email!,
        uid: userCredential.user.uid,
      };
      setUser(user);
      //redirect user to ...home, recipes ...
      navigateTo('/recipes');
      console.log('User logged in:', userCredential.user);
    } catch (err) {
      console.error('Error logging in:', err); // log error
      setError('Failed to log in. Please try again.');
    }
  };

  // Logout function
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log('user logged out');
        setUser(null);
      })
      .catch((error) => {
        console.log('user couldnt logout', error);
      });
  };
  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    // console.log('Stored User on load:', storedUser); // Debug log
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
    getUserFromFirebase();
  }, []);

  // Return the provider with the value of the context
  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

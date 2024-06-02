import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';

// Define the shape of the context state
interface AuthContextProps {
  user: { email: string } | null;
  setUser: (user: { email: string } | null) => void;
  login: (user: { email: string }) => void;
  logout: () => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define the type for the provider's props
interface AuthProviderProps {
  children: ReactNode;
}

// Create the provider component
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored User on load:', storedUser); // Debug log
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: { email: string }) => {
    console.log('Logging in user:', user); // Debug log
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    console.log('Logging out user'); // Debug log
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
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

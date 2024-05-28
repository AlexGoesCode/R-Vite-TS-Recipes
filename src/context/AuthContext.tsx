import { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of the context state
interface AuthContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
  login: (username: string) => void;
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
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AppContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

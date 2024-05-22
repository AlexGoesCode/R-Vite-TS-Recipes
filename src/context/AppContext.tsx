import { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of the context state
interface AppContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
}

// Create the context with a default undefined value
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Define the type for the provider's props
interface AppProviderProps {
  children: ReactNode;
}

// Create the provider component
const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };

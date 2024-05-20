import React, { createContext, ReactNode, useState, useContext } from 'react';

// Define a type for the context value
type MyContextType = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

// Create the context with a default value
const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;

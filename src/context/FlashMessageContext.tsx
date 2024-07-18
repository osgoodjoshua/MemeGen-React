import React, { createContext, useState, ReactNode } from 'react';

interface FlashMessageContextProps {
  message: string;
  setMessage: (message: string) => void;
}

export const FlashMessageContext = createContext<FlashMessageContextProps | undefined>(undefined);

export const FlashMessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');

  return (
    <FlashMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

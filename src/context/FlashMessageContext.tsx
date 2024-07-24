import React, { createContext, useState, ReactNode } from 'react';

interface FlashMessageContextProps {
  message: string;
  setMessage: (message: string) => void;
}

export const FlashMessageContext = createContext<FlashMessageContextProps | undefined>(undefined);

interface FlashMessageProviderProps {
  children: ReactNode;
}

export const FlashMessageProvider: React.FC<FlashMessageProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string>('');

  return (
    <FlashMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

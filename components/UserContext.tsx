'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

//This defines the structure of the user data
interface User {
  fullname: string;
  email: string;
  password: string;
  firstName?: string
}

//This defines the context's shape
interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  signedIn: boolean;
  setSignedIn: (status: boolean) => void
}

// This creates the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

//Easy custom hook for using context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

//The provider that wraps the app app
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : { fullname: '', email: '', password: '' }
    }

    return { fullname: '', email: '', password: '' }
  });

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedStatus = localStorage.getItem('sigedIn')
      return storedStatus === 'true'
    }
    return false
  })

  //This saves user's data to localstorage when updated
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('signedIn', signedIn.toString())
  }, [signedIn])

  return (
    <UserContext.Provider value={{ user, setUser, signedIn, setSignedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };

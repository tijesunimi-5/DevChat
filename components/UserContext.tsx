'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  fullname?: string;
  email?: string;
  password?: string;
  firstName?: string;
}

interface DevInfo {
  DevField?: string;
  DevStack?: string[];
  DevExperience?: number | string;
}

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  devInfo: DevInfo;
  setDevInfo: React.Dispatch<React.SetStateAction<DevInfo>>;
  signedIn: boolean;
  setSignedIn: (status: boolean) => void;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  linkUploadProgress: number;
  setLinkUploadProgress: React.Dispatch<React.SetStateAction<number>>;
  QnAProgress: number;
  setQnAProgress: React.Dispatch<React.SetStateAction<number>>; }

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ fullname: '', email: '', password: '' });
  const [devInfo, setDevInfo] = useState<DevInfo>({ DevField: '', DevExperience: 0, DevStack: [] });
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [linkUploadProgress, setLinkUploadProgress] = useState<number>(0);
  const [QnAProgress, setQnAProgress] = useState<number>(0);

  // Hydrate all states from localStorage once client-side
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedDevInfo = localStorage.getItem('devInfo');
    const storedSignedIn = localStorage.getItem('signedIn');
    const storedProgress = localStorage.getItem('progress');
    const storedLinkProgress = localStorage.getItem('linkProgress');
    const storedQnA = localStorage.getItem('QnAProgress');

    if (storedUser) setUser(JSON.parse(storedUser) || {});
    if (storedDevInfo) setDevInfo(JSON.parse(storedDevInfo) || {});
    if (storedSignedIn) setSignedIn(storedSignedIn === 'true');
    if (storedProgress) setProgress(parseInt(storedProgress, 10));
    if (storedLinkProgress) setLinkUploadProgress(parseInt(storedLinkProgress, 10));
    if (storedQnA) setQnAProgress(parseInt(storedQnA, 10));
  }, []);


  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('devInfo', JSON.stringify(devInfo));
    localStorage.setItem('signedIn', signedIn.toString());
    localStorage.setItem('progress', progress.toString());
    localStorage.setItem('linkProgress', linkUploadProgress.toString());
    localStorage.setItem('QnAProgress', QnAProgress.toString());
  }, [user, devInfo, signedIn, progress, linkUploadProgress, QnAProgress]);

  return (
    <UserContext.Provider value={{ user, setUser, devInfo, setDevInfo, signedIn, setSignedIn, progress, setProgress, linkUploadProgress, setLinkUploadProgress, QnAProgress, setQnAProgress }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };

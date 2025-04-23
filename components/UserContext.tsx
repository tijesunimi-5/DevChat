'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the User interface
interface User {
  fullname: string; // Make required if always expected
  email: string;
  password: string;
  firstName?: string; // Keep optional if not always present
}

// Define the DevInfo interface
interface DevInfo {
  DevField: string; // Make required if always expected
  DevStack: string[]; // Ensure this is always an array, not undefined
  DevExperience: number | string; // Keep as union type
}

// Define the UserContextProps interface
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
  setQnAProgress: React.Dispatch<React.SetStateAction<number>>;
  trainModelProgress: number;
  setTrainModelProgress: React.Dispatch<React.SetStateAction<number>>;
  resetContext: () => void; // Add reset function for logout or cleanup
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserProvider component
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize states with proper default values
  const [user, setUser] = useState<User>({
    fullname: '',
    email: '',
    password: '',
    firstName: '',
  });

  const [devInfo, setDevInfo] = useState<DevInfo>({
    DevField: '',
    DevStack: [], // Always initialize as an empty array
    DevExperience: 0,
  });

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [linkUploadProgress, setLinkUploadProgress] = useState<number>(0);
  const [QnAProgress, setQnAProgress] = useState<number>(0);
  const [trainModelProgress, setTrainModelProgress] = useState<number>(0);

  // Hydrate states from localStorage on mount (client-side)
  useEffect(() => {
    const hydrateState = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedDevInfo = localStorage.getItem('devInfo');
        const storedSignedIn = localStorage.getItem('signedIn');
        const storedProgress = localStorage.getItem('progress');
        const storedLinkProgress = localStorage.getItem('linkProgress');
        const storedQnA = localStorage.getItem('QnAProgress');
        const storedTrainedProgress = localStorage.getItem('Train-model-progress');

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser || { fullname: '', email: '', password: '', firstName: '' });
        }
        if (storedDevInfo) {
          const parsedDevInfo = JSON.parse(storedDevInfo);
          setDevInfo({
            DevField: parsedDevInfo.DevField || '',
            DevStack: Array.isArray(parsedDevInfo.DevStack) ? parsedDevInfo.DevStack : [],
            DevExperience: parsedDevInfo.DevExperience || 0,
          });
        }
        if (storedSignedIn) {
          setSignedIn(storedSignedIn === 'true');
        }
        if (storedProgress) {
          const parsedProgress = parseInt(storedProgress, 10);
          setProgress(isNaN(parsedProgress) ? 0 : parsedProgress);
        }
        if (storedLinkProgress) {
          const parsedLinkProgress = parseInt(storedLinkProgress, 10);
          setLinkUploadProgress(isNaN(parsedLinkProgress) ? 0 : parsedLinkProgress);
        }
        if (storedQnA) {
          const parsedQnA = parseInt(storedQnA, 10);
          setQnAProgress(isNaN(parsedQnA) ? 0 : parsedQnA);
        }
        if (storedTrainedProgress) {
          const parsedTrainedProgress = parseInt(storedTrainedProgress, 10);
          setTrainModelProgress(isNaN(parsedTrainedProgress) ? 0 : parsedTrainedProgress);
        }
      } catch (error) {
        console.error('Error hydrating state from localStorage:', error);
        // Reset to default values on error
        setUser({ fullname: '', email: '', password: '', firstName: '' });
        setDevInfo({ DevField: '', DevStack: [], DevExperience: 0 });
        setSignedIn(false);
        setProgress(0);
        setLinkUploadProgress(0);
        setQnAProgress(0);
        setTrainModelProgress(0);
      }
    };

    hydrateState();
  }, []);

  // Persist states to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('devInfo', JSON.stringify(devInfo));
      localStorage.setItem('signedIn', signedIn.toString());
      localStorage.setItem('progress', progress.toString());
      localStorage.setItem('linkProgress', linkUploadProgress.toString());
      localStorage.setItem('QnAProgress', QnAProgress.toString());
      localStorage.setItem('Train-model-progress', trainModelProgress.toString());
    } catch (error) {
      console.error('Error persisting state to localStorage:', error);
    }
  }, [user, devInfo, signedIn, progress, linkUploadProgress, QnAProgress, trainModelProgress]);

  // Reset function to clear context and localStorage (e.g., for logout)
  const resetContext = () => {
    setUser({ fullname: '', email: '', password: '', firstName: '' });
    setDevInfo({ DevField: '', DevStack: [], DevExperience: 0 });
    setSignedIn(false);
    setProgress(0);
    setLinkUploadProgress(0);
    setQnAProgress(0);
    setTrainModelProgress(0);

    // Clear localStorage
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('devInfo');
      localStorage.removeItem('signedIn');
      localStorage.removeItem('progress');
      localStorage.removeItem('linkProgress');
      localStorage.removeItem('QnAProgress');
      localStorage.removeItem('Train-model-progress');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        devInfo,
        setDevInfo,
        signedIn,
        setSignedIn,
        progress,
        setProgress,
        linkUploadProgress,
        setLinkUploadProgress,
        QnAProgress,
        setQnAProgress,
        trainModelProgress,
        setTrainModelProgress,
        resetContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
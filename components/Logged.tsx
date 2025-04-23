'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useUser } from './UserContext';

export default function Logged() {
  const { data: session, status } = useSession();
  const { setUser, setSignedIn } = useUser();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      console.log("Session User: ", session.user);

      // Save user to localStorage
      const userData = {
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
      };
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('User saved to localStorage:', userData);

      // Update UserContext
      setUser({
        fullname: session.user.name || '',
        email: session.user.email || '',
        password: '', // Google Sign-In doesn't provide a password
      });
      setSignedIn(true);

      // Save signedIn status to localStorage
      localStorage.setItem('signedIn', 'true');
    } else if (status === 'unauthenticated') {
      // Clear user data if not authenticated
      localStorage.removeItem('user');
      localStorage.setItem('signedIn', 'false');
      setUser({
        fullname: '',
        email: '',
        password: '',
      });
      setSignedIn(false);
    }
  }, [status, session, setUser, setSignedIn]);

  return null; // This component doesn't render anything
}
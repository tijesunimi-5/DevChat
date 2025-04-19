import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useUser } from './UserContext'; // Adjust path to your context

export default function Logged() {
  const { data: session, status } = useSession();
  const { setUser, setSignedIn } = useUser();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      console.log("Session User: ", session.user); // Log to see the session object

      // Set user in context or state
      setUser({
        fullname: session.user.name || '',
        email: session.user.email || '',
        // image: session.user.image || '',
        password: '', // Set blank or handle password separately
      });

      setSignedIn(true);
    }
  }, [session, status, setUser, setSignedIn]);

  return null; // You can render any component here based on session status
}

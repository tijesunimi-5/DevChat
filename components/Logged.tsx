import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useUser } from './UserContext'; // Adjust path to your context

export default function Logged() {
  // const { data: session, status } = useSession();
  const { setUser, setSignedIn } = useUser();

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedSignedIn = localStorage.getItem('signedIn')

    

    if (storedSignedIn === 'true' && storedUser) {
      const user = JSON.parse(storedUser)
      console.log('User from localstorage: ', user)

      setUser({
        fullname: user.fullname || '',
        email: user.email || '',
        password: user.password || "" 
      })

      // setSignedIn(true)
    } 
    else {
      setUser({
        fullname: '',
        email: '',
        password: ''
      })
    }
    
    
    // if (status === 'authenticated' && session?.user) {
    //   console.log("Session User: ", session.user); // Log to see the session object

    //   // Set user in context or state
    //   setUser({
    //     fullname: session.user.name || '',
    //     email: session.user.email || '',
    //     // image: session.user.image || '',
    //     password: '', // Set blank or handle password separately
    //   });

    //   setSignedIn(true);
    // } else {
    //   setUser({
    //     fullname: '',
    //     email: '',
    //     password: ''
    //   })

    //   setSignedIn(false)
    // }
  }, [  setUser ]);

  return null; // You can render any component here based on session status
}

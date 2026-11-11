import { useEffect, useState } from 'react';
import { AuthUser, watchAuth } from './auth';

// Batata hai ke koi login hai ya nahi. `ready` tab true hota hai jab Firebase ne pehli baar jawab de diya.
export function useAuthUser() {
  const [user, setUser] = useState<AuthUser>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = watchAuth(u => {
      setUser(u);
      setReady(true);
    });
    return unsubscribe;
  }, []);

  return { user, ready };
}

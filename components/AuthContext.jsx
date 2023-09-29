import { createContext, useContext } from 'react';

// Create a context with a default value of null
const AuthContext = createContext({user:null,magic:null});

// Create a custom hook for using the context
// This will make it easier to use in components
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
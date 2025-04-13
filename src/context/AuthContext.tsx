
import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: SimpleUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isWhitelisted: boolean;
}

interface SimpleUser {
  username: string;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  login: () => false,
  logout: () => {},
  isWhitelisted: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SimpleUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Simple login logic with hardcoded credentials
  const login = (username: string, password: string) => {
    setIsLoading(true);
    
    // Check if credentials match
    const isValid = username === 'admin' && password === 'admin';
    
    if (isValid) {
      const simpleUser = { username };
      localStorage.setItem('user', JSON.stringify(simpleUser));
      setUser(simpleUser);
    }
    
    setIsLoading(false);
    return isValid;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        isLoading, 
        login, 
        logout,
        isWhitelisted: true // Since we're using simple auth, all logged-in users are considered whitelisted
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

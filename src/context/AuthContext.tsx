
import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  adminLogin: (username: string, password: string) => boolean;
  logout: () => void;
  isWhitelisted: boolean;
  isAdmin: boolean;
}

interface User {
  username: string;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  login: () => false,
  adminLogin: () => false,
  logout: () => {},
  isWhitelisted: false,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
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

  // Login pentru utilizatori normali
  const login = (username: string, password: string) => {
    setIsLoading(true);
    
    // Verificăm credențialele (simplificat)
    const isValid = username.length >= 3 && password.length >= 3;
    
    if (isValid) {
      const userData = { username, isAdmin: false };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
    
    setIsLoading(false);
    return isValid;
  };

  // Login pentru admin
  const adminLogin = (username: string, password: string) => {
    setIsLoading(true);
    
    // Verificăm credențialele de admin
    const isValid = username === 'admin' && password === 'admin';
    
    if (isValid) {
      const userData = { username, isAdmin: true };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
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
        adminLogin,
        logout,
        isWhitelisted: true,
        isAdmin: user?.isAdmin || false
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

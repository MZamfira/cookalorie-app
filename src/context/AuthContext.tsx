
import React, { createContext, useState, useContext, useEffect } from 'react';

// List of Google email addresses that are allowed to access the admin page
const WHITELISTED_ADMIN_EMAILS = ['admin1@example.com', 'admin2@example.com']; // Replace with actual admin emails

interface AuthContextType {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  isWhitelisted: boolean;
}

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  isWhitelisted: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      const userData = localStorage.getItem('google_user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData) as GoogleUser;
          setUser(parsedUser);
          setIsWhitelisted(WHITELISTED_ADMIN_EMAILS.includes(parsedUser.email));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('google_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = () => {
    // For this demo, we'll use a mock flow with a prompt
    const mockGoogleLogin = () => {
      const email = prompt('Enter your email for testing:');
      if (!email) return;
      
      const name = prompt('Enter your name:') || 'User';
      
      // Mock user data
      const mockUser: GoogleUser = {
        id: '123456789',
        email: email,
        name: name,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      };
      
      // Save user data
      localStorage.setItem('google_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      setIsWhitelisted(WHITELISTED_ADMIN_EMAILS.includes(email));
    };
    
    mockGoogleLogin();
  };

  const logout = () => {
    localStorage.removeItem('google_user');
    setUser(null);
    setIsWhitelisted(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        isLoading, 
        login, 
        logout,
        isWhitelisted
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

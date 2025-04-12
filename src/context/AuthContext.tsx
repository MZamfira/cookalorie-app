
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
    // Load the Google API script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

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
      
      // Load Google script after checking local storage
      loadGoogleScript();
    };

    checkAuth();

    return () => {
      // Clean up any Google API related resources if needed
      window.google?.accounts?.id?.cancel();
    };
  }, []);

  // Initialize Google Sign-In
  const initializeGoogleSignIn = () => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: '109411404829-kh0kbf6b0f4afvd8cu4ija9u6r3rk3dr.apps.googleusercontent.com', // Replace with your actual client ID
      callback: handleGoogleSignInCallback,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  };

  // Handle the Google Sign-In callback
  const handleGoogleSignInCallback = (response: any) => {
    // Decode the JWT token from Google
    const token = response.credential;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const { sub, email, name, picture } = JSON.parse(jsonPayload);
    
    const googleUser: GoogleUser = {
      id: sub,
      email,
      name,
      picture,
    };

    localStorage.setItem('google_user', JSON.stringify(googleUser));
    setUser(googleUser);
    setIsWhitelisted(WHITELISTED_ADMIN_EMAILS.includes(email));
  };

  const login = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      console.error('Google Sign-In is not initialized yet');
    }
  };

  const logout = () => {
    localStorage.removeItem('google_user');
    setUser(null);
    setIsWhitelisted(false);
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
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

// Add type definition for the Google global object
declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (config: any) => void;
          prompt: (callback?: () => void) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          disableAutoSelect: () => void;
          cancel: () => void;
        };
      };
    };
  }
}

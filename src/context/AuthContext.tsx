
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Octokit } from '@octokit/rest';

// List of GitHub usernames that are allowed to access the admin page
const WHITELISTED_GITHUB_USERS = ['admin1', 'admin2']; // Replace with actual GitHub usernames

interface AuthContextType {
  isAuthenticated: boolean;
  user: GitHubUser | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  isWhitelisted: boolean;
}

interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
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
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const token = localStorage.getItem('github_token');
      if (token) {
        try {
          const octokit = new Octokit({ auth: token });
          const { data } = await octokit.users.getAuthenticated();
          
          const user: GitHubUser = {
            id: data.id,
            login: data.login,
            name: data.name,
            avatar_url: data.avatar_url,
          };
          
          setUser(user);
          setIsWhitelisted(WHITELISTED_GITHUB_USERS.includes(data.login));
        } catch (error) {
          console.error('Error verifying token:', error);
          localStorage.removeItem('github_token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = () => {
    // In a real app, this would redirect to GitHub OAuth
    // For this demo, we'll use a mock flow with a prompt
    const mockGitHubFlow = async () => {
      const username = prompt('Enter your GitHub username for testing:');
      if (!username) return;
      
      // Mock user data
      const mockUser: GitHubUser = {
        id: 12345,
        login: username,
        name: username,
        avatar_url: `https://avatars.githubusercontent.com/u/12345`,
      };
      
      // Set mock token
      localStorage.setItem('github_token', 'mock_token_' + username);
      
      setUser(mockUser);
      setIsWhitelisted(WHITELISTED_GITHUB_USERS.includes(username));
    };
    
    mockGitHubFlow();
  };

  const logout = () => {
    localStorage.removeItem('github_token');
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


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChefHat, Lock, Book, ShoppingCart, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-recipe-primary" />
          <Link to="/" className="text-xl font-display font-semibold">Cookalorie</Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="font-medium transition-colors hover:text-recipe-primary">Acasă</Link>
          <Link to="/my-recipes" className="font-medium transition-colors hover:text-recipe-primary flex items-center gap-1">
            <Book className="h-3 w-3" />
            Rețetele mele
          </Link>
          <Link to="/shopping-list" className="font-medium transition-colors hover:text-recipe-primary flex items-center gap-1">
            <ShoppingCart className="h-3 w-3" />
            Lista de cumpărături
          </Link>
          {user?.isAdmin && (
            <Link to="/admin" className="font-medium transition-colors hover:text-recipe-primary flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Admin
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
                <User className="h-3 w-3" />
                <span>{user?.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex items-center gap-1">
                <LogOut className="h-3 w-3" />
                Deconectare
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
              <LogIn className="h-3 w-3" />
              <Link to="/login">Conectare</Link>
            </Button>
          )}
          
          <Button variant="default" className="hidden md:flex">
            <Link to="/">Generează rețetă</Link>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col py-4 gap-2">
            <Link to="/" className="py-2 font-medium transition-colors hover:text-recipe-primary">Acasă</Link>
            <Link to="/my-recipes" className="py-2 font-medium transition-colors hover:text-recipe-primary flex items-center gap-1">
              <Book className="h-3 w-3" />
              Rețetele mele
            </Link>
            <Link to="/shopping-list" className="py-2 font-medium transition-colors hover:text-recipe-primary flex items-center gap-1">
              <ShoppingCart className="h-3 w-3" />
              Lista de cumpărături
            </Link>
            {user?.isAdmin && (
              <Link to="/admin" className="py-2 font-medium transition-colors hover:text-recipe-primary flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <User className="h-3 w-3" />
                  <span>{user?.username}</span>
                </div>
                <Button variant="outline" onClick={handleLogout} className="mt-2 flex items-center gap-1">
                  <LogOut className="h-3 w-3" />
                  Deconectare
                </Button>
              </>
            ) : (
              <Button variant="outline" className="mt-2 flex items-center gap-1">
                <LogIn className="h-3 w-3" />
                <Link to="/login">Conectare</Link>
              </Button>
            )}
            <Button variant="default" className="mt-2">
              <Link to="/">Generează rețetă</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

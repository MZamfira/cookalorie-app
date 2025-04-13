
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
      toast({
        title: 'Autentificare reușită',
        description: 'Ai acces la panoul de administrare.',
      });
    }
  }, [isAuthenticated, navigate, toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Te rugăm să completezi toate câmpurile');
      return;
    }
    
    const success = login(username, password);
    
    if (!success) {
      setError('Credențiale incorecte. Încearcă cu admin/admin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-recipe-background">
      <div className="flex items-center justify-center h-16 border-b bg-white/95 backdrop-blur px-4">
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-recipe-primary" />
          <span className="text-xl font-display font-semibold">Cookalorie</span>
        </div>
      </div>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-lg border bg-card text-card-foreground shadow">
          <div className="text-center mb-6">
            <Lock className="h-10 w-10 text-recipe-primary mx-auto mb-3" />
            <h1 className="text-2xl font-display font-bold">Acces Administrator</h1>
            <p className="text-muted-foreground mt-1">
              Autentifică-te pentru a accesa panoul de administrare
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Utilizator</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="username"
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin" 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Parolă</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••" 
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">Utilizator: admin, Parolă: admin</p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Se încarcă...' : 'Autentificare'}
            </Button>
            
            <div className="text-center mt-6">
              <Button variant="link" onClick={() => navigate('/')}>
                Înapoi la pagina principală
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Cookalorie. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;

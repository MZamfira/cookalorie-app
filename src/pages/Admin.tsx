
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiKeyProvider } from '@/context/ApiKeyContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import ApiKeyConfig from '@/components/ApiKeyConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ApiKeyProvider>
      <div className="min-h-screen flex flex-col bg-recipe-background">
        <Header />
        <main className="container py-12 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Lock className="h-6 w-6 text-recipe-primary" />
              <h1 className="text-3xl font-display font-bold">Panou de administrare</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {user && (
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
                  <User className="h-3 w-3" />
                  <span>{user.username}</span>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                Deconectare
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-recipe-primary" />
                <CardTitle>Configurare API Cookalorie</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Configurează cheia API Spoonacular aici. Odată setată, toți utilizatorii aplicației vor putea obține
                date reale despre rețete fără a fi nevoie să își configureze propriile chei API.
              </p>
              
              <ApiKeyConfig adminView={true} />
            </CardContent>
          </Card>
        </main>
        <footer className="border-t py-6 mt-auto">
          <div className="container text-center text-sm text-muted-foreground">
            <p>© 2025 Cookalorie. Toate drepturile rezervate.</p>
          </div>
        </footer>
      </div>
    </ApiKeyProvider>
  );
};

export default Admin;

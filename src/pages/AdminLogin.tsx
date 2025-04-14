
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Mail, Lock } from 'lucide-react';

const AdminLogin = () => {
  const { isAuthenticated, isWhitelisted, login, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Render Google Sign-In button when available
    const renderGoogleButton = () => {
      if (window.google?.accounts?.id && googleButtonRef.current) {
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: '280',
        });
      }
    };

    // Retry rendering the button when Google API is loaded
    const intervalId = setInterval(() => {
      if (window.google?.accounts?.id) {
        renderGoogleButton();
        clearInterval(intervalId);
      }
    }, 300);

    return () => {
      clearInterval(intervalId);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && isWhitelisted) {
      navigate('/admin');
      toast({
        title: 'Autentificare reușită',
        description: 'Ai acces la panoul de administrare.',
      });
    } else if (isAuthenticated && !isWhitelisted && !isLoading) {
      toast({
        variant: 'destructive',
        title: 'Acces refuzat',
        description: `Adresa de email "${user?.email}" nu este pe lista de administratori permisi.`,
      });
    }
  }, [isAuthenticated, isWhitelisted, navigate, toast, user, isLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-recipe-background">
      <div className="flex items-center justify-center h-16 border-b bg-white/95 backdrop-blur px-4">
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-recipe-primary" />
          <span className="text-xl font-display font-semibold">NutriSaver</span>
        </div>
      </div>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-lg border bg-card text-card-foreground shadow">
          <div className="text-center mb-6">
            <Lock className="h-10 w-10 text-recipe-primary mx-auto mb-3" />
            <h1 className="text-2xl font-display font-bold">Acces Administrator</h1>
            <p className="text-muted-foreground mt-1">
              Autentifică-te cu Google pentru a accesa panoul de administrare
            </p>
          </div>
          
          <div className="space-y-4">
            {isAuthenticated && !isWhitelisted && (
              <div className="p-3 bg-destructive/10 text-destructive rounded text-sm">
                Contul tău Google nu are permisiune de administrator.
              </div>
            )}
            
            {/* Native Google Sign-In button */}
            <div className="flex justify-center mb-4">
              <div ref={googleButtonRef}></div>
            </div>
            
            {/* Custom login button as fallback */}
            {isLoading ? (
              <Button className="w-full" disabled>
                Se încarcă...
              </Button>
            ) : (
              <Button 
                className="w-full" 
                onClick={login}
              >
                <Mail className="mr-2 h-4 w-4" />
                {isAuthenticated ? 'Schimbă contul Google' : 'Conectare cu Google'}
              </Button>
            )}
            
            <div className="text-center mt-6">
              <Button variant="link" onClick={() => navigate('/')}>
                Înapoi la pagina principală
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Cookalerie. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;

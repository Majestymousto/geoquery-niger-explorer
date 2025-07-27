import { Search, Globe, Menu, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/results');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo et titre */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-niger-green to-niger-orange">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">GeoQuery Niger</h1>
            <p className="text-xs text-muted-foreground">Géoportail Intelligent</p>
          </div>
        </Link>

        {/* Barre de recherche centrale - masquée sur mobile */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Posez votre question : 'Quel est le taux de pauvreté à Zinder ?'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 pr-4 h-10 bg-muted/30 border-border/50 focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Navigation et actions */}
        <div className="flex items-center space-x-2">
          {/* Bouton langue */}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Languages className="h-4 w-4" />
            <span className="ml-2 text-sm">FR</span>
          </Button>

          {/* Menu mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Accueil</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/explorer">Explorer</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/datasets">Jeux de données</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/data-stories">Data Stories</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">Tableau de bord</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/about">À propos</Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-4">
            {/* Barre de recherche mobile */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            
            {/* Navigation mobile */}
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/">Accueil</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/explorer">Explorer</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/datasets">Jeux de données</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/data-stories">Data Stories</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/dashboard">Tableau de bord</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/about">À propos</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
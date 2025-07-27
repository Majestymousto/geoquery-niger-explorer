import { useState } from "react";
import { Search, BarChart3, Map, Users, TrendingUp, MapPin, GraduationCap, Heart, Wheat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/niger-hero.jpg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const quickQueries = [
    "Population de Niamey 2023",
    "Taux de pauvreté à Zinder",
    "Production agricole Tillabéri",
    "Accès à l'eau potable Agadez",
    "Éducation primaire Dosso",
    "Santé maternelle Maradi"
  ];

  const regions = [
    { name: "Agadez", population: "542,000", icon: MapPin },
    { name: "Diffa", population: "679,000", icon: MapPin },
    { name: "Dosso", population: "2,200,000", icon: MapPin },
    { name: "Maradi", population: "4,000,000", icon: MapPin },
    { name: "Tahoua", population: "4,100,000", icon: MapPin },
    { name: "Tillabéri", population: "3,300,000", icon: MapPin },
    { name: "Zinder", population: "4,000,000", icon: MapPin },
    { name: "Niamey", population: "1,300,000", icon: MapPin }
  ];

  const keyStats = [
    { title: "Population totale", value: "25.1M", change: "+3.8%", icon: Users },
    { title: "Régions couvertes", value: "8", change: "100%", icon: Map },
    { title: "Indicateurs disponibles", value: "150+", change: "+15", icon: BarChart3 },
    { title: "Données actualisées", value: "2023", change: "Récent", icon: TrendingUp }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/results?q=' + encodeURIComponent(searchQuery));
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    navigate('/results?q=' + encodeURIComponent(query));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-africa bg-pattern-african">
        <div className="absolute inset-0 bg-black/20" />
        <img 
          src={heroImage} 
          alt="Paysage du Niger" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Géoportail Intelligent du
              <span className="block text-sand-yellow drop-shadow-lg">Niger</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in">
              Explorez les données ouvertes du Niger avec des visualisations interactives, 
              des cartes dynamiques et des analyses approfondies alimentées par l'IA.
            </p>
            
            {/* Barre de recherche principale */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Exemple : 'Quel est le taux de pauvreté à Zinder en 2023 ?'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg bg-white/95 backdrop-blur border-white/20 focus:bg-white transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch}
                size="lg"
                className="mt-4 px-8 py-3 text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-lg transition-smooth"
              >
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </Button>
            </div>

            {/* Questions rapides */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <Button 
                onClick={() => handleQuickSearch("population")} 
                variant="secondary" 
                className="p-4 h-auto flex-col items-center bg-white/10 hover:bg-white/20 border-white/20 transition-smooth text-white hover:text-white"
              >
                <Users className="h-6 w-6 mb-2" />
                <span>Population</span>
              </Button>
              <Button 
                onClick={() => handleQuickSearch("éducation")} 
                variant="secondary"
                className="p-4 h-auto flex-col items-center bg-white/10 hover:bg-white/20 border-white/20 transition-smooth text-white hover:text-white"
              >
                <GraduationCap className="h-6 w-6 mb-2" />
                <span>Éducation</span>
              </Button>
              <Button 
                onClick={() => handleQuickSearch("santé")} 
                variant="secondary"
                className="p-4 h-auto flex-col items-center bg-white/10 hover:bg-white/20 border-white/20 transition-smooth text-white hover:text-white"
              >
                <Heart className="h-6 w-6 mb-2" />
                <span>Santé</span>
              </Button>
              <Button 
                onClick={() => handleQuickSearch("agriculture")} 
                variant="secondary"
                className="p-4 h-auto flex-col items-center bg-white/10 hover:bg-white/20 border-white/20 transition-smooth text-white hover:text-white"
              >
                <Wheat className="h-6 w-6 mb-2" />
                <span>Agriculture</span>
              </Button>
            </div>

            {/* Suggestions rapides */}
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {quickQueries.slice(0, 3).map((query, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 cursor-pointer transition-smooth px-4 py-2"
                  onClick={() => handleQuickSearch(query)}
                >
                  {query}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques clés */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="card-africa text-center hover-scale">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 gradient-africa rounded-full shadow-africa">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground mb-2">{stat.title}</p>
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                      {stat.change}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Régions du Niger */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explorez les Régions du Niger
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez les données démographiques, économiques et sociales de chaque région.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((region, index) => {
              const Icon = region.icon;
              return (
                <Card 
                  key={index} 
                  className="card-africa hover-scale cursor-pointer group"
                  onClick={() => navigate('/explorer?region=' + region.name)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 gradient-africa rounded-lg shadow-sm group-hover:shadow-md transition-smooth">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{region.name}</h3>
                    <p className="text-sm text-muted-foreground">{region.population} hab.</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 gradient-africa">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à explorer les données du Niger ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Découvrez des insights sur le développement, l'économie et la société nigérienne 
            grâce à nos outils d'analyse avancés et nos visualisations interactives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg bg-white text-primary hover:bg-white/90 shadow-lg transition-smooth"
              onClick={() => navigate('/explorer')}
            >
              <Search className="h-5 w-5 mr-2" />
              Commencer l'exploration
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20 transition-smooth"
              onClick={() => navigate('/dashboard')}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Voir le tableau de bord
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
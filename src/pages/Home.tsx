import { useState } from "react";
import { Search, BarChart3, Map, Users, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
      // Navigation vers la page de résultats
      console.log("Recherche:", searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-niger-green via-niger-orange to-niger-yellow">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Explorez le Niger avec
              <span className="block text-niger-yellow">GeoQuery Niger</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Posez vos questions en français et obtenez des réponses précises avec des cartes, 
              graphiques et analyses des données du Niger.
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
                variant="niger"
                size="lg"
                className="mt-4 px-8 py-3 text-lg font-semibold"
              >
                Rechercher
              </Button>
            </div>

            {/* Questions rapides */}
            <div className="flex flex-wrap gap-2 justify-center">
              {quickQueries.slice(0, 4).map((query, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 cursor-pointer transition-colors px-4 py-2"
                  onClick={() => setSearchQuery(query)}
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
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-niger-green to-niger-orange rounded-full">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground mb-2">{stat.title}</p>
                    <Badge variant="secondary" className="bg-niger-yellow/20 text-niger-green">
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
                <Card key={index} className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-gradient-to-r from-niger-green to-niger-orange rounded-lg">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{region.name}</h3>
                    <p className="text-sm text-muted-foreground">{region.population} hab.</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-niger-green to-niger-orange">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à explorer les données du Niger ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Commencez votre recherche maintenant et découvrez des insights sur le développement, 
            l'économie et la société nigérienne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="sahel" size="lg" className="px-8 py-3 text-lg">
              Commencer l'exploration
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20">
              Voir les indicateurs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
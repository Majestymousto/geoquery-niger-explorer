import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  BookOpen, TrendingUp, Users, GraduationCap, Heart, 
  Wheat, Eye, Calendar, MapPin, ArrowRight, ChevronRight 
} from 'lucide-react';

interface DataStory {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  insights: string[];
  data: any[];
  chartType: 'line' | 'bar' | 'pie';
  tags: string[];
  readTime: number;
}

const dataStories: DataStory[] = [
  {
    id: '1',
    title: 'L\'évolution de l\'éducation au Niger : Progrès et défis',
    category: 'Éducation',
    date: '2024-01-15',
    author: 'Équipe d\'analyse Qwiper',
    summary: 'Une analyse approfondie des progrès de l\'éducation au Niger au cours des 5 dernières années, révélant des tendances encourageantes mais aussi des défis persistants.',
    insights: [
      'Le taux de scolarisation primaire a augmenté de 15% entre 2019 et 2023',
      'Des disparités importantes persistent entre les régions urbaines et rurales',
      'L\'éducation des filles progresse mais reste un défi majeur',
      'Les investissements dans l\'infrastructure éducative portent leurs fruits'
    ],
    data: [
      { year: 2019, niamey: 78, tahoua: 65, zinder: 62, maradi: 68 },
      { year: 2020, niamey: 80, tahoua: 67, zinder: 64, maradi: 69 },
      { year: 2021, niamey: 82, tahoua: 69, zinder: 66, maradi: 70 },
      { year: 2022, niamey: 84, tahoua: 71, zinder: 67, maradi: 71 },
      { year: 2023, niamey: 85, tahoua: 73, zinder: 69, maradi: 72 }
    ],
    chartType: 'line',
    tags: ['Éducation', 'Scolarisation', 'Développement', 'Régions'],
    readTime: 8
  },
  {
    id: '2',
    title: 'Santé maternelle et infantile : Défis et innovations',
    category: 'Santé',
    date: '2024-01-10',
    author: 'Dr. Aminata Sow',
    summary: 'Exploration des indicateurs de santé maternelle et infantile au Niger, mettant en lumière les programmes innovants qui sauvent des vies.',
    insights: [
      'La mortalité infantile a diminué de 20% grâce aux programmes de vaccination',
      'Les centres de santé communautaires ont amélioré l\'accès aux soins',
      'La malnutrition reste un défi majeur dans certaines régions',
      'Les campagnes de sensibilisation ont un impact positif mesurable'
    ],
    data: [
      { region: 'Niamey', mortalite: 42, vaccination: 95, malnutrition: 18 },
      { region: 'Tahoua', mortalite: 59, vaccination: 87, malnutrition: 28 },
      { region: 'Zinder', mortalite: 65, vaccination: 82, malnutrition: 32 },
      { region: 'Maradi', mortalite: 61, vaccination: 85, malnutrition: 30 },
      { region: 'Dosso', mortalite: 55, vaccination: 89, malnutrition: 25 }
    ],
    chartType: 'bar',
    tags: ['Santé', 'Mortalité infantile', 'Vaccination', 'Malnutrition'],
    readTime: 6
  },
  {
    id: '3',
    title: 'Agriculture et sécurité alimentaire : Vers une résilience durable',
    category: 'Agriculture',
    date: '2024-01-05',
    author: 'Mamadou Diallo',
    summary: 'Analyse des données agricoles et de sécurité alimentaire, explorant les stratégies d\'adaptation au changement climatique.',
    insights: [
      'Les cultures résistantes à la sécheresse gagnent en popularité',
      'L\'irrigation goutte-à-goutte améliore les rendements de 40%',
      'La diversification des cultures réduit les risques alimentaires',
      'Les coopératives agricoles renforcent la résilience communautaire'
    ],
    data: [
      { culture: 'Mil', production: 35, evolution: 5 },
      { culture: 'Sorgho', production: 28, evolution: 8 },
      { culture: 'Niébé', production: 22, evolution: 12 },
      { culture: 'Arachide', production: 15, evolution: -2 }
    ],
    chartType: 'pie',
    tags: ['Agriculture', 'Sécurité alimentaire', 'Climat', 'Innovation'],
    readTime: 10
  }
];

const COLORS = {
  primary: 'hsl(var(--africa-green))',
  secondary: 'hsl(var(--sand-yellow))',
  accent: 'hsl(var(--earth-orange))',
  muted: 'hsl(var(--sahel-sand))',
  gold: 'hsl(var(--desert-gold))'
};

const CHART_COLORS = [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.muted, COLORS.gold];

export default function DataStories() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedStory, setSelectedStory] = useState<DataStory | null>(null);

  const categories = ['Toutes', 'Éducation', 'Santé', 'Agriculture', 'Population', 'Économie'];

  const filteredStories = selectedCategory === 'Toutes' 
    ? dataStories 
    : dataStories.filter(story => story.category === selectedCategory);

  const renderChart = (story: DataStory) => {
    switch (story.chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={story.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="niamey" stroke={COLORS.primary} strokeWidth={2} name="Niamey" />
              <Line type="monotone" dataKey="tahoua" stroke={COLORS.secondary} strokeWidth={2} name="Tahoua" />
              <Line type="monotone" dataKey="zinder" stroke={COLORS.accent} strokeWidth={2} name="Zinder" />
              <Line type="monotone" dataKey="maradi" stroke={COLORS.gold} strokeWidth={2} name="Maradi" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={story.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mortalite" fill={COLORS.accent} name="Mortalité (‰)" />
              <Bar dataKey="vaccination" fill={COLORS.primary} name="Vaccination (%)" />
              <Bar dataKey="malnutrition" fill={COLORS.secondary} name="Malnutrition (%)" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={story.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ culture, production }) => `${culture}: ${production}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="production"
              >
                {story.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  if (selectedStory) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedStory(null)}
          className="mb-6"
        >
          ← Retour aux stories
        </Button>

        <article className="space-y-8">
          {/* En-tête de l'article */}
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">{selectedStory.category}</Badge>
              <span>•</span>
              <Calendar className="h-4 w-4" />
              <span>{new Date(selectedStory.date).toLocaleDateString('fr-FR')}</span>
              <span>•</span>
              <Eye className="h-4 w-4" />
              <span>{selectedStory.readTime} min de lecture</span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight">{selectedStory.title}</h1>
            
            <p className="text-lg text-muted-foreground">{selectedStory.summary}</p>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Par {selectedStory.author}</span>
            </div>
          </header>

          {/* Graphique principal */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Données et Visualisation</CardTitle>
            </CardHeader>
            <CardContent>
              {renderChart(selectedStory)}
            </CardContent>
          </Card>

          {/* Insights clés */}
          <Card className="card-africa">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Insights Clés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {selectedStory.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {selectedStory.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* En-tête */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-africa bg-clip-text text-transparent">
          Data Stories
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Découvrez des analyses approfondies et des insights tirés des données du Niger. 
          Nos experts vous racontent l'histoire derrière les chiffres.
        </p>
      </div>

      {/* Filtres par catégorie */}
      <Card className="card-africa">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-smooth"
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stories disponibles</p>
                <p className="text-2xl font-bold text-primary">{filteredStories.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Catégories</p>
                <p className="text-2xl font-bold text-accent">{categories.length - 1}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Temps de lecture moyen</p>
                <p className="text-2xl font-bold text-secondary">
                  {Math.round(filteredStories.reduce((sum, story) => sum + story.readTime, 0) / filteredStories.length)} min
                </p>
              </div>
              <Eye className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des stories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStories.map(story => (
          <Card key={story.id} className="card-africa cursor-pointer group" onClick={() => setSelectedStory(story)}>
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {story.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  <span>{story.readTime} min</span>
                </div>
              </div>
              
              <CardTitle className="group-hover:text-primary transition-colors">
                {story.title}
              </CardTitle>
              
              <CardDescription className="line-clamp-2">
                {story.summary}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Aperçu du graphique */}
              <div className="h-32 bg-muted/20 rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  {story.chartType === 'line' && 'Graphique linéaire'}
                  {story.chartType === 'bar' && 'Histogramme'}
                  {story.chartType === 'pie' && 'Graphique circulaire'}
                </span>
              </div>
              
              {/* Métadonnées */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(story.date).toLocaleDateString('fr-FR')}</span>
                </div>
                
                <Button variant="ghost" size="sm" className="h-8 px-2 group-hover:text-primary">
                  Lire la suite
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {story.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {story.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{story.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section d'appel à l'action */}
      <Card className="gradient-africa text-white">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Contribuez aux Data Stories</h3>
          <p className="text-white/90 max-w-2xl mx-auto">
            Vous avez des données intéressantes ou des analyses à partager ? 
            Rejoignez notre communauté d'analystes et aidez-nous à raconter l'histoire du Niger.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
            Proposer une Story
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
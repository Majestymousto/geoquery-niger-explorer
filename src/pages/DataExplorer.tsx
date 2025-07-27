import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Search, Filter, Download, TrendingUp, Users, MapPin, Calendar } from 'lucide-react';

interface DataPoint {
  id: string;
  region: string;
  sector: string;
  year: number;
  indicator: string;
  value: number;
  unit: string;
}

const mockData: DataPoint[] = [
  // Données d'éducation
  { id: '1', region: 'Niamey', sector: 'Éducation', year: 2023, indicator: 'Taux de scolarisation', value: 85.2, unit: '%' },
  { id: '2', region: 'Tahoua', sector: 'Éducation', year: 2023, indicator: 'Taux de scolarisation', value: 72.8, unit: '%' },
  { id: '3', region: 'Zinder', sector: 'Éducation', year: 2023, indicator: 'Taux de scolarisation', value: 68.5, unit: '%' },
  { id: '4', region: 'Maradi', sector: 'Éducation', year: 2023, indicator: 'Taux de scolarisation', value: 71.3, unit: '%' },
  { id: '5', region: 'Dosso', sector: 'Éducation', year: 2023, indicator: 'Taux de scolarisation', value: 74.6, unit: '%' },
  
  // Données de santé
  { id: '6', region: 'Niamey', sector: 'Santé', year: 2023, indicator: 'Taux de mortalité infantile', value: 42.1, unit: '‰' },
  { id: '7', region: 'Tahoua', sector: 'Santé', year: 2023, indicator: 'Taux de mortalité infantile', value: 58.7, unit: '‰' },
  { id: '8', region: 'Zinder', sector: 'Santé', year: 2023, indicator: 'Taux de mortalité infantile', value: 65.2, unit: '‰' },
  
  // Données population
  { id: '9', region: 'Niamey', sector: 'Population', year: 2023, indicator: 'Population totale', value: 1.302, unit: 'millions' },
  { id: '10', region: 'Tahoua', sector: 'Population', year: 2023, indicator: 'Population totale', value: 4.068, unit: 'millions' },
  { id: '11', region: 'Zinder', sector: 'Population', year: 2023, indicator: 'Population totale', value: 4.982, unit: 'millions' },
];

const regions = ['Toutes les régions', 'Niamey', 'Tahoua', 'Zinder', 'Maradi', 'Dosso', 'Agadez', 'Tillabéri', 'Diffa'];
const sectors = ['Tous les secteurs', 'Éducation', 'Santé', 'Population', 'Économie', 'Agriculture', 'Environnement'];
const years = [2020, 2021, 2022, 2023];
const indicators = ['Tous les indicateurs', 'Taux de scolarisation', 'Taux de mortalité infantile', 'Population totale', 'PIB par habitant'];

const COLORS = ['hsl(var(--africa-green))', 'hsl(var(--sand-yellow))', 'hsl(var(--earth-orange))', 'hsl(var(--sahel-sand))', 'hsl(var(--desert-gold))'];

export default function DataExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Toutes les régions');
  const [selectedSector, setSelectedSector] = useState('Tous les secteurs');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState('Tous les indicateurs');

  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      const matchesSearch = item.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'Toutes les régions' || item.region === selectedRegion;
      const matchesSector = selectedSector === 'Tous les secteurs' || item.sector === selectedSector;
      const matchesYear = !selectedYear || item.year === selectedYear;
      const matchesIndicator = selectedIndicator === 'Tous les indicateurs' || item.indicator === selectedIndicator;
      
      return matchesSearch && matchesRegion && matchesSector && matchesYear && matchesIndicator;
    });
  }, [searchTerm, selectedRegion, selectedSector, selectedYear, selectedIndicator]);

  const chartDataByRegion = useMemo(() => {
    const regionGroups = filteredData.reduce((acc, item) => {
      if (!acc[item.region]) acc[item.region] = [];
      acc[item.region].push(item);
      return acc;
    }, {} as Record<string, DataPoint[]>);

    return Object.entries(regionGroups).map(([region, data]) => ({
      region,
      value: data.reduce((sum, item) => sum + item.value, 0) / data.length
    }));
  }, [filteredData]);

  const downloadData = (format: 'csv' | 'json' | 'xlsx') => {
    // Simulation du téléchargement
    const dataToDownload = filteredData.map(item => ({
      Région: item.region,
      Secteur: item.sector,
      Année: item.year,
      Indicateur: item.indicator,
      Valeur: item.value,
      Unité: item.unit
    }));

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'donnees_niger.json';
      a.click();
    } else if (format === 'csv') {
      const csv = [
        Object.keys(dataToDownload[0]).join(','),
        ...dataToDownload.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'donnees_niger.csv';
      a.click();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* En-tête */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-africa bg-clip-text text-transparent">
          Explorer les Données du Niger
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Analysez les indicateurs socio-économiques du Niger avec nos outils de visualisation interactifs
        </p>
      </div>

      {/* Section de recherche et filtres */}
      <Card className="card-africa">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres Intelligents
          </CardTitle>
          <CardDescription>
            Affinez votre recherche pour explorer les données spécifiques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un indicateur, une région..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Région
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Secteur
              </label>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Année
              </label>
              <Select value={selectedYear?.toString() || 'all'} onValueChange={(value) => setSelectedYear(value === 'all' ? null : parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les années" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les années</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Users className="h-4 w-4" />
                Indicateur
              </label>
              <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {indicators.map(indicator => (
                    <SelectItem key={indicator} value={indicator}>{indicator}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Badges des filtres actifs */}
          <div className="flex flex-wrap gap-2">
            {selectedRegion !== 'Toutes les régions' && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedRegion}
              </Badge>
            )}
            {selectedSector !== 'Tous les secteurs' && (
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                {selectedSector}
              </Badge>
            )}
            {selectedYear && (
              <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                {selectedYear}
              </Badge>
            )}
          </div>

          {/* Boutons de téléchargement */}
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={() => downloadData('csv')} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button onClick={() => downloadData('json')} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              JSON
            </Button>
            <Button onClick={() => downloadData('xlsx')} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              XLSX
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Données trouvées</p>
                <p className="text-2xl font-bold text-primary">{filteredData.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Régions couvertes</p>
                <p className="text-2xl font-bold text-accent">{new Set(filteredData.map(d => d.region)).size}</p>
              </div>
              <MapPin className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Secteurs analysés</p>
                <p className="text-2xl font-bold text-secondary">{new Set(filteredData.map(d => d.sector)).size}</p>
              </div>
              <Users className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <Tabs defaultValue="bar" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bar">Histogramme</TabsTrigger>
          <TabsTrigger value="line">Courbes</TabsTrigger>
          <TabsTrigger value="pie">Répartition</TabsTrigger>
        </TabsList>

        <TabsContent value="bar">
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Comparaison par Région</CardTitle>
              <CardDescription>
                Valeurs moyennes des indicateurs sélectionnés par région
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartDataByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line">
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Évolution Temporelle</CardTitle>
              <CardDescription>
                Tendances des indicateurs dans le temps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartDataByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie">
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Répartition par Secteur</CardTitle>
              <CardDescription>
                Distribution des indicateurs par secteur d'activité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartDataByRegion}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartDataByRegion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tableau de données */}
      <Card className="card-africa">
        <CardHeader>
          <CardTitle>Données Détaillées</CardTitle>
          <CardDescription>
            Tableau complet des données filtrées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Région</th>
                  <th className="text-left p-2 font-medium">Secteur</th>
                  <th className="text-left p-2 font-medium">Année</th>
                  <th className="text-left p-2 font-medium">Indicateur</th>
                  <th className="text-left p-2 font-medium">Valeur</th>
                  <th className="text-left p-2 font-medium">Unité</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-2">{item.region}</td>
                    <td className="p-2">
                      <Badge variant="outline" className="text-xs">
                        {item.sector}
                      </Badge>
                    </td>
                    <td className="p-2">{item.year}</td>
                    <td className="p-2">{item.indicator}</td>
                    <td className="p-2 font-mono">{item.value.toLocaleString()}</td>
                    <td className="p-2 text-muted-foreground">{item.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
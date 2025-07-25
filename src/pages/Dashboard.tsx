import { useState } from "react";
import { Filter, Download, RefreshCw, BarChart3, TrendingUp, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedIndicator, setSelectedIndicator] = useState("all");

  const regions = [
    { value: "all", label: "Toutes les régions" },
    { value: "agadez", label: "Agadez" },
    { value: "diffa", label: "Diffa" },
    { value: "dosso", label: "Dosso" },
    { value: "maradi", label: "Maradi" },
    { value: "niamey", label: "Niamey" },
    { value: "tahoua", label: "Tahoua" },
    { value: "tillaberi", label: "Tillabéri" },
    { value: "zinder", label: "Zinder" }
  ];

  const years = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" }
  ];

  const indicators = [
    { value: "all", label: "Tous les indicateurs" },
    { value: "demography", label: "Démographie" },
    { value: "economy", label: "Économie" },
    { value: "education", label: "Éducation" },
    { value: "health", label: "Santé" },
    { value: "infrastructure", label: "Infrastructure" }
  ];

  // Données simulées pour les KPI
  const kpiData = [
    {
      title: "Population Totale",
      value: "25.1M",
      change: "+3.8%",
      trend: "up",
      icon: Users,
      color: "niger-green"
    },
    {
      title: "Taux de Pauvreté Moyen",
      value: "44.1%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
      color: "niger-orange"
    },
    {
      title: "Taux d'Alphabétisation",
      value: "37.3%",
      change: "+1.8%",
      trend: "up",
      icon: BarChart3,
      color: "niger-yellow"
    },
    {
      title: "Accès à l'Eau Potable",
      value: "51.8%",
      change: "+4.2%",
      trend: "up",
      icon: MapPin,
      color: "sahel-sand"
    }
  ];

  // Données pour les graphiques
  const regionPovertyData = [
    { region: 'Niamey', rate: 28.4, population: 1.3 },
    { region: 'Agadez', rate: 39.1, population: 0.54 },
    { region: 'Zinder', rate: 43.7, population: 4.0 },
    { region: 'Dosso', rate: 45.2, population: 2.2 },
    { region: 'Maradi', rate: 47.2, population: 4.0 },
    { region: 'Tahoua', rate: 49.8, population: 4.1 },
    { region: 'Tillabéri', rate: 51.8, population: 3.3 },
    { region: 'Diffa', rate: 53.1, population: 0.68 }
  ];

  const timeSeriesData = [
    { year: '2019', poverty: 46.8, literacy: 34.1, water: 47.3 },
    { year: '2020', poverty: 48.2, literacy: 35.2, water: 48.7 },
    { year: '2021', poverty: 46.1, literacy: 36.1, water: 49.8 },
    { year: '2022', poverty: 45.3, literacy: 36.8, water: 50.9 },
    { year: '2023', poverty: 44.1, literacy: 37.3, water: 51.8 }
  ];

  // Données pour le tableau des indicateurs
  const indicatorTableData = [
    {
      category: "Démographie",
      indicator: "Population totale",
      value: "25,130,817",
      unit: "habitants",
      year: "2023",
      trend: "up",
      change: "+3.8%"
    },
    {
      category: "Économie",
      indicator: "PIB par habitant",
      value: "554",
      unit: "USD",
      year: "2023",
      trend: "up",
      change: "+2.1%"
    },
    {
      category: "Éducation",
      indicator: "Taux d'alphabétisation",
      value: "37.3",
      unit: "%",
      year: "2023",
      trend: "up",
      change: "+1.8%"
    },
    {
      category: "Santé",
      indicator: "Espérance de vie",
      value: "63.2",
      unit: "années",
      year: "2023",
      trend: "up",
      change: "+0.7%"
    },
    {
      category: "Infrastructure",
      indicator: "Accès à l'électricité",
      value: "19.2",
      unit: "%",
      year: "2023",
      trend: "up",
      change: "+3.1%"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tableau de Bord Niger</h1>
              <p className="text-muted-foreground">Indicateurs clés et analyses des données nationales</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtres */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres et Sélections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Région</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Année</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Catégorie</label>
                <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {indicators.map((indicator) => (
                      <SelectItem key={indicator.value} value={indicator.value}>
                        {indicator.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg bg-${kpi.color}/20`}>
                        <Icon className={`h-6 w-6 text-${kpi.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{kpi.title}</p>
                        <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Badge 
                      variant="secondary" 
                      className={`${kpi.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}
                    >
                      {kpi.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs. année précédente</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs pour différentes vues */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="regions">Analyse régionale</TabsTrigger>
            <TabsTrigger value="indicators">Indicateurs détaillés</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des Indicateurs Clés</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line type="monotone" dataKey="poverty" stroke="hsl(var(--niger-green))" strokeWidth={2} name="Pauvreté %" />
                      <Line type="monotone" dataKey="literacy" stroke="hsl(var(--niger-orange))" strokeWidth={2} name="Alphabétisation %" />
                      <Line type="monotone" dataKey="water" stroke="hsl(var(--niger-yellow))" strokeWidth={2} name="Accès eau %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Taux de Pauvreté par Région</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={regionPovertyData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="region" type="category" stroke="hsl(var(--muted-foreground))" width={60} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="rate" fill="hsl(var(--niger-green))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparaison Régionale Détaillée</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Région</TableHead>
                      <TableHead>Population</TableHead>
                      <TableHead>Taux de Pauvreté</TableHead>
                      <TableHead>Alphabétisation</TableHead>
                      <TableHead>Accès Eau</TableHead>
                      <TableHead>Tendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {regionPovertyData.map((region, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{region.region}</TableCell>
                        <TableCell>{region.population}M</TableCell>
                        <TableCell>{region.rate}%</TableCell>
                        <TableCell>{(Math.random() * 20 + 25).toFixed(1)}%</TableCell>
                        <TableCell>{(Math.random() * 30 + 40).toFixed(1)}%</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            ↗ Amélioration
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indicators" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Indicateurs Détaillés par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Indicateur</TableHead>
                      <TableHead>Valeur</TableHead>
                      <TableHead>Unité</TableHead>
                      <TableHead>Année</TableHead>
                      <TableHead>Évolution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {indicatorTableData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{item.indicator}</TableCell>
                        <TableCell className="text-lg font-semibold">{item.value}</TableCell>
                        <TableCell className="text-muted-foreground">{item.unit}</TableCell>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`${item.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}
                          >
                            {item.change}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState } from "react";
import { ArrowLeft, Download, Share2, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Map from "@/components/Map";

const Results = () => {
  const [query] = useState("Taux de pauvreté à Zinder en 2023");
  
  // Données simulées pour les graphiques
  const povertyData = [
    { year: '2018', rate: 48.3 },
    { year: '2019', rate: 47.1 },
    { year: '2020', rate: 49.2 },
    { year: '2021', rate: 46.8 },
    { year: '2022', rate: 45.1 },
    { year: '2023', rate: 43.7 }
  ];

  const regionData = [
    { name: 'Zinder', rate: 43.7, color: '#8B5CF6' },
    { name: 'Maradi', rate: 47.2, color: '#F59E0B' },
    { name: 'Tillabéri', rate: 51.8, color: '#EF4444' },
    { name: 'Agadez', rate: 39.1, color: '#10B981' },
    { name: 'Niamey', rate: 28.4, color: '#3B82F6' }
  ];

  const mapRegions = [
    { name: "Zinder", coordinates: [13.8, 8.98] as [number, number], data: { poverty: 43.7 } },
    { name: "Maradi", coordinates: [13.5, 7.1] as [number, number], data: { poverty: 47.2 } },
    { name: "Tillabéri", coordinates: [14.2, 1.45] as [number, number], data: { poverty: 51.8 } }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header de résultats */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Résultats de recherche</h1>
                <p className="text-muted-foreground">"{query}"</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Résumé textuel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-niger-green" />
                  Analyse et Résumé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-niger-green/10 to-niger-orange/10 p-4 rounded-lg border-l-4 border-niger-green">
                    <h3 className="font-semibold text-lg mb-2">Taux de Pauvreté à Zinder - 2023</h3>
                    <p className="text-foreground mb-3">
                      Le taux de pauvreté dans la région de Zinder s'établit à <strong>43.7%</strong> en 2023, 
                      soit une amélioration de <strong>1.4 points</strong> par rapport à 2022.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-niger-green/20 text-niger-green">
                        Tendance en baisse
                      </Badge>
                      <Badge variant="secondary" className="bg-niger-orange/20 text-niger-orange">
                        Données 2023
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Points clés :</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-niger-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Amélioration continue depuis 2020 (-5.5 points)
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-niger-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Zinder se classe 2ème région la moins pauvre après Agadez
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-niger-yellow rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Population affectée : environ 1.75 million de personnes
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Graphiques */}
            <Tabs defaultValue="evolution" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="evolution">Évolution</TabsTrigger>
                <TabsTrigger value="comparison">Comparaison</TabsTrigger>
                <TabsTrigger value="distribution">Répartition</TabsTrigger>
              </TabsList>

              <TabsContent value="evolution" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution du Taux de Pauvreté - Zinder</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={povertyData}>
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
                        <Line 
                          type="monotone" 
                          dataKey="rate" 
                          stroke="hsl(var(--niger-green))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--niger-orange))', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Comparaison par Région - 2023</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={regionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Bar dataKey="rate" fill="hsl(var(--niger-green))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="distribution" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Répartition Régionale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={regionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="rate"
                          label={({ name, rate }) => `${name}: ${rate}%`}
                        >
                          {regionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Carte */}
            <Card>
              <CardHeader>
                <CardTitle>Localisation - Zinder</CardTitle>
              </CardHeader>
              <CardContent>
                <Map 
                  className="h-64" 
                  center={[13.8, 8.98]}
                  zoom={8}
                  regions={mapRegions}
                />
              </CardContent>
            </Card>

            {/* Métadonnées */}
            <Card>
              <CardHeader>
                <CardTitle>Informations sur les Données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Source</span>
                  <p className="text-sm">Institut National de la Statistique (INS) Niger</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Dernière mise à jour</span>
                  <p className="text-sm">Décembre 2023</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Méthodologie</span>
                  <p className="text-sm">Enquête Harmonisée sur les Conditions de Vie des Ménages (EHCVM)</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Échantillon</span>
                  <p className="text-sm">12,450 ménages enquêtés</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Voir d'autres années
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Comparer avec d'autres régions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Télécharger les données brutes
                </Button>
                <Button variant="niger" className="w-full justify-start">
                  Analyser avec l'IA
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
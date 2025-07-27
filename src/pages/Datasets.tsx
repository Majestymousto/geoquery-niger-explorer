import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Download, Calendar, FileText, Users, BarChart3, 
  Filter, Eye, Star, ExternalLink, Database, TrendingUp 
} from 'lucide-react';

interface Dataset {
  id: string;
  title: string;
  description: string;
  category: string;
  format: string[];
  size: string;
  lastUpdated: string;
  downloadCount: number;
  rating: number;
  tags: string[];
  source: string;
  license: string;
  featured: boolean;
}

const datasets: Dataset[] = [
  {
    id: '1',
    title: 'Recensement Général de la Population et de l\'Habitat 2012',
    description: 'Données complètes du recensement de la population du Niger, incluant les données démographiques, socio-économiques et géographiques par région, département et commune.',
    category: 'Population',
    format: ['CSV', 'XLSX', 'JSON'],
    size: '245 MB',
    lastUpdated: '2023-12-15',
    downloadCount: 2847,
    rating: 4.8,
    tags: ['Démographie', 'Population', 'Recensement', 'Géographie'],
    source: 'Institut National de la Statistique (INS)',
    license: 'Open Data',
    featured: true
  },
  {
    id: '2',
    title: 'Indicateurs de l\'Éducation Primaire 2020-2023',
    description: 'Taux de scolarisation, abandons scolaires, performances aux examens, infrastructures éducatives par région et par genre.',
    category: 'Éducation',
    format: ['CSV', 'XLSX'],
    size: '89 MB',
    lastUpdated: '2023-11-20',
    downloadCount: 1523,
    rating: 4.6,
    tags: ['Éducation', 'Scolarisation', 'Performances', 'Genre'],
    source: 'Ministère de l\'Éducation Nationale',
    license: 'CC BY 4.0',
    featured: true
  },
  {
    id: '3',
    title: 'Données de Santé Publique 2023',
    description: 'Indicateurs de santé maternelle et infantile, couverture vaccinale, prévalence des maladies, infrastructures sanitaires.',
    category: 'Santé',
    format: ['CSV', 'JSON', 'XML'],
    size: '156 MB',
    lastUpdated: '2023-12-01',
    downloadCount: 987,
    rating: 4.7,
    tags: ['Santé', 'Vaccination', 'Mortalité', 'Infrastructures'],
    source: 'Ministère de la Santé Publique',
    license: 'Open Data',
    featured: false
  },
  {
    id: '4',
    title: 'Production Agricole et Sécurité Alimentaire',
    description: 'Données sur les cultures céréalières, élevage, rendements agricoles, marchés et prix des denrées alimentaires.',
    category: 'Agriculture',
    format: ['CSV', 'XLSX', 'GeoJSON'],
    size: '312 MB',
    lastUpdated: '2023-10-30',
    downloadCount: 1876,
    rating: 4.5,
    tags: ['Agriculture', 'Sécurité alimentaire', 'Marchés', 'Céréales'],
    source: 'Ministère de l\'Agriculture',
    license: 'CC BY-SA 4.0',
    featured: true
  },
  {
    id: '5',
    title: 'Données Économiques et Financières 2022-2023',
    description: 'PIB régional, commerce extérieur, investissements, budget de l\'État, fiscalité et indicateurs macroéconomiques.',
    category: 'Économie',
    format: ['CSV', 'XLSX', 'JSON'],
    size: '67 MB',
    lastUpdated: '2023-09-15',
    downloadCount: 743,
    rating: 4.3,
    tags: ['PIB', 'Commerce', 'Budget', 'Investissements'],
    source: 'Ministère des Finances',
    license: 'Open Data',
    featured: false
  },
  {
    id: '6',
    title: 'Données Environnementales et Climatiques',
    description: 'Données météorologiques, qualité de l\'air, ressources en eau, déforestation et changement climatique.',
    category: 'Environnement',
    format: ['CSV', 'NetCDF', 'GeoTIFF'],
    size: '478 MB',
    lastUpdated: '2023-11-10',
    downloadCount: 654,
    rating: 4.4,
    tags: ['Climat', 'Météo', 'Eau', 'Déforestation'],
    source: 'Direction Météorologie Nationale',
    license: 'CC BY 4.0',
    featured: false
  }
];

const categories = ['Toutes', 'Population', 'Éducation', 'Santé', 'Agriculture', 'Économie', 'Environnement'];
const formats = ['Tous', 'CSV', 'XLSX', 'JSON', 'XML', 'GeoJSON', 'NetCDF', 'GeoTIFF'];

export default function Datasets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedFormat, setSelectedFormat] = useState('Tous');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Toutes' || dataset.category === selectedCategory;
    const matchesFormat = selectedFormat === 'Tous' || dataset.format.includes(selectedFormat);
    const matchesFeatured = !showFeaturedOnly || dataset.featured;
    
    return matchesSearch && matchesCategory && matchesFormat && matchesFeatured;
  });

  const downloadDataset = (dataset: Dataset, format: string) => {
    // Simulation du téléchargement
    console.log(`Téléchargement du dataset ${dataset.title} au format ${format}`);
    // Ici on pourrait déclencher un vrai téléchargement
  };

  const renderStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* En-tête */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-africa bg-clip-text text-transparent">
          Jeux de Données du Niger
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Accédez aux données ouvertes officielles du Niger. Téléchargez, analysez et utilisez 
          ces données pour vos recherches, analyses et applications.
        </p>
      </div>

      {/* Filtres et recherche */}
      <Card className="card-africa">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Recherche et Filtres
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par titre, description ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtres */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Catégorie</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formats.map(format => (
                    <SelectItem key={format} value={format}>{format}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Affichage</label>
              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className="w-full justify-start"
              >
                <Star className="h-4 w-4 mr-2" />
                Jeux de données vedettes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jeux de données</p>
                <p className="text-2xl font-bold text-primary">{filteredDatasets.length}</p>
              </div>
              <Database className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Téléchargements</p>
                <p className="text-2xl font-bold text-accent">
                  {filteredDatasets.reduce((sum, d) => sum + d.downloadCount, 0).toLocaleString()}
                </p>
              </div>
              <Download className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Catégories</p>
                <p className="text-2xl font-bold text-secondary">{categories.length - 1}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-africa">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Note moyenne</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {(datasets.reduce((sum, d) => sum + d.rating, 0) / datasets.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des datasets */}
      <div className="space-y-6">
        {filteredDatasets.map((dataset) => (
          <Card key={dataset.id} className="card-africa">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{dataset.title}</CardTitle>
                    {dataset.featured && (
                      <Badge className="bg-gradient-africa text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Vedette
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Mis à jour le {new Date(dataset.lastUpdated).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{dataset.downloadCount.toLocaleString()} téléchargements</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{dataset.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 ml-4">
                  {renderStarRating(dataset.rating)}
                  <span className="text-sm text-muted-foreground ml-1">({dataset.rating})</span>
                </div>
              </div>
              
              <CardDescription className="text-base leading-relaxed">
                {dataset.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Métadonnées */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Source :</span> {dataset.source}
                </div>
                <div>
                  <span className="font-medium">Licence :</span> {dataset.license}
                </div>
                <div>
                  <span className="font-medium">Catégorie :</span>
                  <Badge variant="outline" className="ml-2">
                    {dataset.category}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Formats :</span>
                  <div className="inline-flex gap-1 ml-2">
                    {dataset.format.map(format => (
                      <Badge key={format} variant="secondary" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {dataset.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {dataset.format.map(format => (
                  <Button
                    key={format}
                    variant="outline"
                    size="sm"
                    onClick={() => downloadDataset(dataset, format)}
                    className="transition-smooth"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {format}
                  </Button>
                ))}
                <Button variant="ghost" size="sm" className="ml-auto">
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDatasets.length === 0 && (
        <Card className="card-africa">
          <CardContent className="p-12 text-center">
            <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun jeu de données trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche ou vos filtres.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Section d'appel à l'action */}
      <Card className="gradient-africa text-white">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Vous ne trouvez pas les données que vous cherchez ?</h3>
          <p className="text-white/90 max-w-2xl mx-auto">
            Contactez-nous pour demander l'accès à d'autres jeux de données ou pour contribuer 
            avec vos propres données ouvertes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
              Demander des données
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Contribuer des données
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
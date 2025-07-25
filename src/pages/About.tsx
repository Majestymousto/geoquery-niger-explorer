import { Users, Target, Lightbulb, Award, Heart, Code, Database, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const teamFeatures = [
    {
      icon: Code,
      title: "Développement Expert",
      description: "Technologies modernes et architecture scalable"
    },
    {
      icon: Database,
      title: "Gestion des Données",
      description: "Traitement et analyse de données géospatiales"
    },
    {
      icon: Globe,
      title: "Vision Globale",
      description: "Solutions adaptées aux enjeux locaux et régionaux"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Précision",
      description: "Des données fiables et des analyses exactes pour éclairer les décisions."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Technologies de pointe pour démocratiser l'accès à l'information géographique."
    },
    {
      icon: Heart,
      title: "Impact Social",
      description: "Contribuer au développement durable et à l'amélioration des conditions de vie."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-niger-green via-niger-orange to-niger-yellow">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            À propos de GeoQuery Niger
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Notre Mission
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Démocratiser l'accès aux données géospatiales du Niger pour favoriser 
            un développement éclairé et durable.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Pourquoi GeoQuery Niger ?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Le Niger, avec ses 25 millions d'habitants et ses 8 régions, génère une quantité 
                importante de données socio-économiques. Notre plateforme centralise et rend 
                accessible cette information cruciale pour :
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-niger-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Les décideurs publics et privés
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-niger-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Les chercheurs et analystes
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-niger-yellow rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Les organisations de développement
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-niger-green rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Les citoyens soucieux de comprendre leur région
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-niger-green/20 to-niger-orange/20 rounded-2xl p-8">
                <div className="bg-background rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Impact Attendu
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Décisions éclairées</span>
                      <Badge variant="secondary">+85%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Accès aux données</span>
                      <Badge variant="secondary">+200%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Temps d'analyse</span>
                      <Badge variant="secondary">-70%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident le développement de GeoQuery Niger
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-gradient-to-r from-niger-green to-niger-orange rounded-full">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Qwiper Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-niger-green to-niger-orange rounded-full">
                <Award className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Développé par Qwiper Team
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              GeoQuery Niger est le fruit du travail de <strong className="text-foreground">Qwiper Team</strong>, 
              une équipe passionnée de développeurs et d'experts en données géospatiales. 
              Notre mission est de créer des solutions technologiques innovantes qui répondent 
              aux besoins spécifiques de l'Afrique de l'Ouest.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {teamFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-niger-green to-niger-orange rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-niger-green to-niger-orange p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                Excellence & Innovation
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Qwiper Team combine expertise technique et connaissance approfondie du contexte 
                africain pour livrer des solutions qui font vraiment la différence.
              </p>
              <Button variant="sahel" size="lg">
                En savoir plus sur Qwiper Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Une Question ? Une Suggestion ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nous sommes à l'écoute de vos besoins pour améliorer continuellement GeoQuery Niger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg">
              Nous Contacter
            </Button>
            <Button variant="outline" size="lg">
              Contribuer au Projet
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
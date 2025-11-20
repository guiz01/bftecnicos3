"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Award, Users, BookOpen, Globe, Mail, Phone, MapPin, Instagram, Search, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/pagination";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import GTranslateWrapper from "@/components/GTranslateWrapper";

interface Tecnico {
  id: string;
  name: string;
  title: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  social_media: string | null;
  specialty: string | null;
  avatar_url?: string | null;
}

const Index = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [filteredTecnicos, setFilteredTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tecnicosPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Biofeedback PRO - Encontre seu Especialista";
  }, []);

  useEffect(() => {
    const fetchTecnicos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tecnicos')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching tecnicos:", error);
      } else if (data) {
        setTecnicos(data);
        setFilteredTecnicos(data);
        setTotalPages(Math.ceil(data.length / tecnicosPerPage));
      }
      setLoading(false);
    };

    fetchTecnicos();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredTecnicos(tecnicos);
      setTotalPages(Math.ceil(tecnicos.length / tecnicosPerPage));
      setCurrentPage(1);
    } else {
      const filtered = tecnicos.filter(tecnico => 
        tecnico.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tecnico.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tecnico.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tecnico.specialty || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tecnico.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tecnico.phone || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTecnicos(filtered);
      setTotalPages(Math.ceil(filtered.length / tecnicosPerPage));
      setCurrentPage(1);
    }
  }, [searchTerm, tecnicos]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const scrollToTecnicos = () => {
    const element = document.getElementById('tecnicos-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const indexOfLastTecnico = currentPage * tecnicosPerPage;
  const indexOfFirstTecnico = indexOfLastTecnico - tecnicosPerPage;
  const currentTecnicos = filteredTecnicos.slice(indexOfFirstTecnico, indexOfLastTecnico);

  const formatWebsiteUrl = (url: string | null) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const formatSocialMediaUrl = (url: string | null) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    if (url.startsWith('instagram.com/')) {
      return `https://instagram.com/${url.replace('instagram.com/', '')}`;
    }
    return `https://${url}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GTranslateWrapper />
      {/* Header */}
      <Header onScrollToTecnicos={scrollToTecnicos} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Listagem Oficial de Técnicos de Biofeedback
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Encontre profissionais de Biofeedback em língua portuguesa que estão qualificados para utilizarem os únicos dispositivos certificados com marca CE.
          </p>
          <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToTecnicos}>
            Encontrar profissionais
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">O que é Biofeedback?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Com o Biofeedback, o corpo aprende a regular o sistema nervoso e a transformar o stress em equilíbrio. Esta terapia estimula a neuroplasticidade — a habilidade do cérebro de criar novas ligações e aprender a reagir de forma mais calma e saudável à vida.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Benefícios do Biofeedback</h2>
            <p className="text-lg text-muted-foreground">
              Melhore sua qualidade de vida com o poder do autocontrole
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="text-primary" size={24} />
                </div>
                <CardTitle>Redução do Stress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aprenda a gerenciar e reduzir os níveis de stress e ansiedade, promovendo um estado de calma e bem-estar.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Award className="text-primary" size={24} />
                </div>
                <CardTitle>Melhora do Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Otimize o desempenho cognitivo e físico, ideal para atletas, estudantes e profissionais.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-primary" size={24} />
                </div>
                <CardTitle>Alívio da Dor Crônica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ajuda no manejo da dor crônica, como enxaquecas e dores musculares, através do controle da tensão.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Técnicos Certificados Section */}
      <section id="tecnicos-section" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Listagem Oficial de Técnicos de Biofeedback</h2>
            <p className="text-lg text-muted-foreground">
              Profissionais qualificados e treinados pelo método Fredy Vinagre
            </p>
          </div>

          {/* Barra de Busca */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar por nome, especialidade, localização..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
            </div>
            {searchTerm && (
              <p className="text-center text-muted-foreground mt-4">
                Encontrados {filteredTecnicos.length} técnico(s) para "{searchTerm}"
              </p>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="bg-card border-border">
                  <div className="flex items-center p-4">
                    <div className="flex-shrink-0 mr-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center mb-3">
                        <Skeleton className="h-6 w-32 mr-3" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : currentTecnicos.length > 0 ? (
              currentTecnicos.map((tecnico) => (
                <Card key={tecnico.id} className="bg-card border-border hover:shadow-lg hover:shadow-primary/20 transition-shadow">
                  <div className="flex items-start p-4">
                    <div className="flex-shrink-0 mr-4">
                      {tecnico.avatar_url ? (
                        <img src={tecnico.avatar_url} alt={tecnico.name} className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                          <Users className="text-primary" size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="mb-3">
                        <CardTitle className="text-lg truncate">{tecnico.name}</CardTitle>
                        <CardDescription className="text-sm truncate">{tecnico.title}</CardDescription>
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {tecnico.location && (
                          <div className="flex items-start">
                            <MapPin className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                            <a 
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tecnico.location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline truncate"
                            >
                              {tecnico.location}
                            </a>
                          </div>
                        )}
                        {tecnico.email && (
                          <div className="flex items-start">
                            <Mail className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                            <a 
                              href={`mailto:${tecnico.email}`}
                              className="text-primary hover:underline truncate"
                            >
                              {tecnico.email}
                            </a>
                          </div>
                        )}
                        {tecnico.phone && (
                          <div className="flex items-start">
                            <Phone className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                            <a 
                              href={`tel:${tecnico.phone}`}
                              className="text-primary hover:underline truncate"
                            >
                              {tecnico.phone}
                            </a>
                          </div>
                        )}
                        {tecnico.website && (
                          <div className="flex items-start">
                            <Globe className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                            <a 
                              href={formatWebsiteUrl(tecnico.website)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline truncate"
                            >
                              {tecnico.website}
                            </a>
                          </div>
                        )}
                        {tecnico.social_media && (
                          <div className="flex items-start">
                            <ExternalLink className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                            <a 
                              href={formatSocialMediaUrl(tecnico.social_media)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline truncate"
                            >
                              {tecnico.social_media}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum técnico encontrado</h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? `Nenhum técnico encontrado para "${searchTerm}". Tente buscar por outros termos.`
                    : "Ainda não há técnicos cadastrados no sistema."
                  }
                </p>
              </div>
            )}
          </div>

          {/* Paginação */}
          {!loading && filteredTecnicos.length > tecnicosPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
          {/* Texto "entre muitos outros" */}
          {!loading && filteredTecnicos.length > 0 && (
            <p className="text-center text-muted-foreground mt-4">
              entre muitos outros
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Pronto para transformar sua vida?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Encontre um profissional certificado perto de você e comece sua jornada de bem-estar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={scrollToTecnicos}>
              Encontrar profissionais
            </Button>
            <Button 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-primary" 
              style={{ backgroundColor: 'hsl(0deg 0% 12.16%)' }}
              onClick={() => window.open('https://fredyvinagre.com/equipamentos', '_blank')}
            >
              Quero ser um terapeuta
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
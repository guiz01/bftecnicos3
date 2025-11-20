"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Globe, Mail, Phone, ExternalLink, Heart, Users, Award, Search } from "lucide-react";
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
}

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [filteredTecnicos, setFilteredTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tecnicosPerPage = 6;

  useEffect(() => {
    document.title = "Página não encontrada | Biofeedback PRO";
  }, []);

  useEffect(() => {
    const fetchTecnicos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tecnicos')
        .select('*');

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

  const handleScrollToTecnicos = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('tecnicos-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
      {/* GTranslate Wrapper */}
      <GTranslateWrapper />
      
      {/* Header */}
      <Header onScrollToTecnicos={handleScrollToTecnicos} />

      {/* 404 Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <p className="text-lg text-muted-foreground mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </section>

      {/* Técnicos Certificados Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Técnicos Certificados</h2>
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
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <Users className="text-primary" size={24} />
                      </div>
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
            <Button size="lg" variant="secondary" onClick={handleScrollToTecnicos}>
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

export default NotFound;
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
}

const FredyVinagre = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [filteredTecnicos, setFilteredTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tecnicosPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Fredy Vinagre | Especialista em Biofeedback - Biofeedback PRO";
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

      {/* Hero Section - Full Page */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/background2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Fredy Vinagre
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Especialista em Biofeedback e Desenvolvimento Humano
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              Conhecer o Método
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Ver Formações
            </Button>
          </div>
        </div>
      </section>

      {/* Sobre Fredy */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Quem é o Fredy Vinagre?</h2>
            <p className="text-lg text-muted-foreground">
              Uma trajetória dedicada ao bem-estar e desenvolvimento humano
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Texto principal - 2/3 do espaço */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Formação e Carreira</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Fredy Vinagre formou-se em Comunicação Social pela Universidade Autónoma de Lisboa. Foi jornalista durante vários anos, tendo trabalhado em publicações como a Exame. Fez parte da equipa fundadora do jornal Meios&amp;Publicidade, publicação que mais tarde dirigiu.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Foi ainda responsável pelo lançamento em Portugal da JustLeader uma revista na área da gestão de recursos humanos. Foi também o autor e "inventor" do projecto editorial BoasNotícias, um site de informação cujo critério editorial era simples: só eram publicadas as boas notícias de Portugal e do mundo.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Transição para o Biofeedback</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Em 2007 abandona o jornalismo para se dedicar a tempo inteiro à área terapêutica. Torna-se técnico de Biofeedback, uma terapia que ficou conhecida em Portugal como terapia quântica. E é na sequência da terapia quântica que lança o livro "Ser Feliz Custa Tão Pouco", uma vez que ele reúne todas as práticas e conselhos que o autor dá nas suas sessões terapêuticas.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Em 2018 torna-se Biofeedback Specialist certificado pela BANHS – The Board of Advanced Natural Health Sciences. No mesmo ano integra a Clínica Dr. Pinto Coelho trabalhando com uma excelente equipa em cuidados de saúde.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Atuação Internacional e Reconhecimento</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  É formador internacional de Biofeedback, tendo participado nos últimos anos nos congressos mundiais de Las Vegas e de Budapeste como orador. Corre o mundo a fazer uma das suas paixões: ensinar. Ensinar a ajudar.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Desde 2022 que se tornou naturopata com cédula profissional nº C-002770 emitida pela Administração Central do Sistema da Saúde do Ministério da Saúde de Portugal.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Um ano depois abre a sua própria clínica, a Clínica de Biofeedback by Fredy Vinagre – Serviços de Naturopatia.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Ainda em 2023 torna-se formador certificado pela Mandelay Kfc.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Em Julho de 2025 passa a ser Representante Oficial da Mandelay em Portugal na venda dos equipamentos e respectiva formação e certificação de novos alunos. No mesmo mês lança 7 ebooks na área da naturopatia, stress, exercícios práticos para a felicidade e dicas para desiquilibrios hormonais, não esquecendo um retrato muito detalhado sobre a Menopausa e os seus efeitos. E o futuro? Ainda agora tudo está a começar.
                </p>
              </div>
            </div>
            
            {/* Imagem, contatos e YouTube - 1/3 do espaço */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative w-full">
                <div className="aspect-[4/5] bg-muted rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="/images/perfil-fredy.jpg" 
                    alt="Fredy Vinagre" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Card de contatos destacado */}
                <div className="absolute -bottom-6 left-0 right-0 bg-card text-foreground rounded-lg shadow-lg p-4">
                  <h4 className="font-semibold text-center mb-3">Contacto</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <a 
                        href="tel:+351961961111"
                        className="text-primary hover:underline"
                      >
                        WhatsApp: (+351) 961 961 111
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <a 
                        href="mailto:fredyvinagre@gmail.com"
                        className="text-primary hover:underline"
                      >
                        fredyvinagre@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Instagram className="w-4 h-4" />
                      <a 
                        href="https://instagram.com/fredyvinagre.biofeedback"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        @fredyvinagre.biofeedback
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica%20de%20Biofeedback%2C%20Avenida%20da%20Rep%C3%BAblica%2C%2032%2C%201%C2%BA%20Esquerdo%201050-193%20Lisboa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Clínica de Biofeedback, Avenida da República, 32, 1º Esquerdo 1050-193 Lisboa
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
                  <span className="font-semibold text-lg">20+ anos</span>
                  <span className="text-sm block">de experiência</span>
                </div>
              </div>
              
              {/* YouTube Embed - Movido para aqui, sem título */}
              <div className="mt-20 w-full">
                <div className="w-full h-[600px] bg-muted rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/FHd-bVV2E0I"
                    title="Fredy Vinagre - Biofeedback"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Localização da Clínica</h3>
            <p className="text-muted-foreground">
              Clínica de Biofeedback by Fredy Vinagre - Serviços de Naturopatia
            </p>
          </div>
          <div className="aspect-video bg-muted rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.5!2d-9.1528!3d38.7228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19347e0b8e8e5d%3A0x8e8e8e8e8e8e8e8e!2sAvenida%20da%20Rep%C3%BAblica%2C%2032%2C%201%C2%BA%20Esquerdo%201050-193%20Lisboa!5e0!3m2!1spt-PT!2spt!4v1234567890!5m2!1spt-PT!2spt"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Clínica de Biofeedback"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Formação e Especializações */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Formação e Especializações</h2>
            <p className="text-lg text-muted-foreground">
              Qualificação académica e profissional de excelência
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Especificações do lado esquerdo */}
            <div className="space-y-6">
              {/* Educação */}
              <Card className="bg-background border-border">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle>Educação</CardTitle>
                      <CardDescription>Formação académica completa</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Graduação em Comunicação Social pela Universidade Autónoma de Lisboa</li>
                    <li>• Especialização em Biofeedback Clínico pelo Biofeedback Institute of America</li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Certificações */}
              <Card className="bg-background border-border">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle>Certificações</CardTitle>
                      <CardDescription>Qualificações profissionais</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Formador Internacional em Biofeedback</li>
                    <li>• Formador certificado pela Mandelay Kfc</li>
                    <li>• Naturopata com cédula profissional nº C-002770</li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Atuação Internacional */}
              <Card className="bg-background border-border">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle>Atuação Internacional</CardTitle>
                      <CardDescription>Experiência global</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Palestrante em congressos mundiais de Las Vegas e Budapeste</li>
                    <li>• Representante Oficial da Mandelay em Portugal</li>
                    <li>• Lançamento de 7 ebooks nas áreas de naturopatia, stress, exercícios práticos para a felicidade, dicas para desequilíbrios hormonais e um estudo aprofundado sobre a menopausa.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Certificado do lado direito */}
            <div className="flex flex-col justify-center">
              <div className="bg-background border border-border rounded-2xl p-6">
                <div className="aspect-[3/4] bg-muted rounded-xl overflow-hidden">
                  <img 
                    src="/images/certificado.jpg" 
                    alt="Certificado de Biofeedback" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-foreground mb-2">Certified by Mandelay Kft</h3>
                  <p className="text-sm text-muted-foreground">
                    Biofeedback Instructor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Método Biofeedback PRO */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">O Método Biofeedback PRO</h2>
            <p className="text-lg text-muted-foreground">
              Uma abordagem única e inovadora no tratamento com Biofeedback
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="text-primary" size={24} />
                </div>
                <CardTitle>Personalizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cada tratamento é adaptado às necessidades individuais do paciente, 
                  considerando seu perfil fisiológico e objetivos específicos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-primary" size={24} />
                </div>
                <CardTitle>Comprovado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Baseado em evidências científicas e resultados comprovados em 
                  milhares de casos tratados ao longo dos anos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Award className="text-primary" size={24} />
                </div>
                <CardTitle>Inovador</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Constantemente atualizado com as últimas tecnologias e 
                  descobertas científicas no campo do Biofeedback.
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
            Conheça o método Fredy Vinagre e comece sua jornada de bem-estar
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

export default FredyVinagre;
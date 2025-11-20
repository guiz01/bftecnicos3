"use client";

import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/mobile-menu";

interface HeaderProps {
  onScrollToTecnicos?: () => void; // Optional prop for scrolling to tecnicos section
}

const Header = ({ onScrollToTecnicos }: HeaderProps) => {
  const navigate = useNavigate();

  const handleScrollToTecnicos = () => {
    if (onScrollToTecnicos) {
      onScrollToTecnicos();
    } else {
      // If onScrollToTecnicos is not provided (e.g., on other pages), navigate to home and then try to scroll
      navigate('/');
      // A small delay might be needed to allow the page to render before scrolling
      setTimeout(() => {
        const element = document.getElementById('tecnicos-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    }
  };

  const handleMobileNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-card shadow-sm border-b border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-start space-x-2 hover:opacity-80 transition-opacity"
            >
              <img src="/images/logo.svg" alt="Biofeedback PRO Logo" className="h-12" />
              <div className="flex flex-col text-left">
                <span className="text-xl font-bold text-foreground">Biofeedback PRO</span>
                <span className="text-sm text-muted-foreground">by Fredy Vinagre</span>
              </div>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" onClick={() => window.open('https://fredyvinagre.com/equipamentos', '_blank')}>Quero ser um terapeuta</Button>
            <Button variant="outline" onClick={() => navigate('/fredy-vinagre')}>
              Quem é Fredy Vinagre
            </Button>
            <Button onClick={handleScrollToTecnicos}>Encontrar profissionais</Button>
          </div>
          <MobileMenu onNavigate={handleMobileNavigate} onScrollToTecnicos={handleScrollToTecnicos} />
        </div>
      </div>
    </header>
  );
};

export default Header;
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  onNavigate: (path: string) => void;
  onScrollToTecnicos: () => void;
}

const MobileMenu = ({ onNavigate, onScrollToTecnicos }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Encontrar profissionais", action: onScrollToTecnicos },
    { label: "Quero ser um terapeuta", action: () => window.open('https://fredyvinagre.com/equipamentos', '_blank') },
    { label: "Quem é Fredy Vinagre", action: () => onNavigate('/fredy-vinagre') },
  ];

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg z-50">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
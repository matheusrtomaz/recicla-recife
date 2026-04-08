import React from 'react';
import Mapa from './components/Mapa';
import { Recycle, MapPin } from 'lucide-react';

function App() {
  const scrollToMap = () => {
    document.getElementById('mapa-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-offwhite font-sans text-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Recycle className="h-8 w-8 text-forest" />
              <span className="font-bold text-xl text-forest tracking-tight">Recicla Recife</span>
            </div>
            <button 
              onClick={scrollToMap}
              className="text-forest font-medium hover:text-brand-dark transition-colors"
            >
              Ver Mapa
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-green text-white">
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
           <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon fill="currentColor" points="0,100 100,0 100,100"/>
           </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:w-2/3">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              O destino certo<br />para um Recife<br />mais sustentável.
            </h1>
            <p className="text-xl lg:text-2xl font-light mb-10 text-mint/90 max-w-2xl">
              Encontre o ponto de coleta seletiva mais próximo de você e ajude a transformar o futuro da nossa cidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToMap}
                className="glow-green bg-white text-forest px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-offwhite transform hover:scale-105 transition-all"
              >
                <MapPin className="h-5 w-5" />
                Encontrar Pontos
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Map Section */}
      <section id="mapa-section" className="py-20 bg-offwhite relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl shadow-xl overflow-hidden p-0 border border-gray-100">
          <Mapa />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white/50 py-12 text-center">
        <p className="flex items-center justify-center gap-2 text-sm justify-center">
          <Recycle className="h-4 w-4" />
          <span>Projeto de Extensão - Recicla Recife &copy; {new Date().getFullYear()}</span>
        </p>
      </footer>
    </div>
  );
}

export default App;

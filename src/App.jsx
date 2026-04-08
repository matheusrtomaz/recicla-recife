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
      <footer className="bg-brand-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
            
            {/* Project Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Recycle className="h-6 w-6 text-mint" />
                <span className="font-bold text-xl tracking-tight">Recicla Recife</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Um projeto de extensão universitária dedicado a facilitar a reciclagem e promover a consciência ambiental na capital pernambucana.
              </p>
            </div>

            {/* Institution Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Instituição</h3>
              <ul className="text-white/60 text-sm space-y-2">
                <li>UNINASSAU</li>
                <li>Centro Universitário Maurício de Nassau</li>
                <li>APIE I - Tecnologia da Informação</li>
                <li>Orientação: Profa. Tereza Carla Souza Pereira</li>
              </ul>
            </div>

            {/* Links & Social */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Conecte-se</h3>
              <div className="flex gap-4">
                <a href="https://github.com/matheusrtomaz/recicla-recife" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-mint hover:text-brand-dark transition-all">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="https://www.instagram.com/matheusrtomaz/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-mint hover:text-brand-dark transition-all">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
              <p className="text-xs text-white/40">
                Fonte de dados: <a href="https://dados.recife.pe.gov.br/dataset/pontos-de-coleta-seletiva" target="_blank" rel="noopener noreferrer" className="hover:text-mint transition-colors underline decoration-white/20">Portal de Dados Abertos da Cidade do Recife</a>
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs text-center">
            <p>&copy; {new Date().getFullYear()} Recicla Recife. Todos os direitos reservados.</p>
            <p>Desenvolvido com carinho para Recife por Matheus Rodrigues Tomaz</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

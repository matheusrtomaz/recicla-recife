import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in Vite + React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroBairro, setFiltroBairro] = useState('');
  const [filtroMaterial, setFiltroMaterial] = useState('');

  useEffect(() => {
    const carregarPontos = async () => {
      try {
        const response = await fetch('/api-recife/api/action/datastore_search?resource_id=bab62397-be40-436a-bc9c-fe7c7bacc0c6&limit=1000');
        const data = await response.json();
        if (data.success) {
          const recordsLimpos = data.result.records.map(r => ({
            ...r,
            bairro: r.bairro ? r.bairro.trim() : '',
            tiporesiduo: r.tiporesiduo ? r.tiporesiduo.trim() : '',
          }));
          setPontos(recordsLimpos);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API do Recife:", error);
      } finally {
        setLoading(false);
      }
    };
    
    carregarPontos();
  }, []);

  const bairros = [...new Set(pontos.map(p => p.bairro))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  const pontosFiltrados = pontos.filter(p => {
    const matchBairro = filtroBairro === '' || p.bairro === filtroBairro;
    const matchMaterial = filtroMaterial === '' || (p.tiporesiduo && p.tiporesiduo.toLowerCase().includes(filtroMaterial.toLowerCase()));
    return matchBairro && matchMaterial;
  });

  return (
    <div className="flex flex-col h-full w-full">
      {/* Filtros */}
      <div className="bg-white p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center z-20 shadow-sm relative">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="text-gray-400 h-5 w-5 hidden sm:block" />
          <h2 className="font-semibold text-forest mr-4">Filtros:</h2>
        </div>
        
        <select 
          className="w-full sm:w-64 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-mint"
          value={filtroBairro}
          onChange={(e) => setFiltroBairro(e.target.value)}
        >
          <option value="">Todos os Bairros</option>
          {bairros.map((b, idx) => b && (
            <option key={idx} value={b}>{b}</option>
          ))}
        </select>

        <select 
          className="w-full sm:w-64 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-mint"
          value={filtroMaterial}
          onChange={(e) => setFiltroMaterial(e.target.value)}
        >
          <option value="">Todos os Materiais</option>
          <option value="metal">Metal</option>
          <option value="isopor">Isopor</option>
          <option value="papel">Papel</option>
          <option value="plástico">Plástico</option>
          <option value="vidro">Vidro</option>
          <option value="eletrônico">Lixo Eletrônico</option>
          <option value="óleo">Óleo de Cozinha</option>
          <option value="pneu">Pneus</option>
          <option value="lâmpada">Lâmpadas</option>
        </select>
        
        <div className="text-sm text-gray-500 w-full text-right sm:w-auto sm:ml-auto">
          {pontosFiltrados.length} ponto(s) encontrado(s)
        </div>
      </div>

      {/* Mapa Container */}
      <div className="h-[500px] w-full relative z-10">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-mint border-t-forest"></div>
          </div>
        )}
        <MapContainer 
          center={[-8.0476, -34.8770]} 
          zoom={12} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pontosFiltrados.map((ponto, index) => {
            const lat = Number(ponto.latitude);
            const lng = Number(ponto.longitude);
            if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;
            return (
              <Marker key={`${ponto._id || index}`} position={[lat, lng]}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-forest text-lg mb-1">{ponto.observacao || 'Ponto de Coleta'}</h3>
                    <p className="text-sm mb-2 text-gray-600">
                      <span className="font-semibold text-gray-800">Endereço:</span> {ponto.endereco}
                      {ponto.complemento && ponto.complemento !== 's/n' && ` - ${ponto.complemento}`}
                      <br />
                      <span className="font-semibold text-gray-800">Bairro:</span> {ponto.bairro}
                    </p>
                    {ponto.tiporesiduo && (
                      <div className="bg-mint/10 p-2 rounded-md border border-mint/20 text-sm">
                        <span className="font-bold text-forest block mb-1">Materiais aceitos:</span>
                        <p className="text-gray-700">{ponto.tiporesiduo}</p>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

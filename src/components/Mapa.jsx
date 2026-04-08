import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, Navigation, MapPin } from 'lucide-react';
import L from 'leaflet';

function LocationMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { animate: true });
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position} icon={RedIcon}>
      <Popup>Você está aqui!</Popup>
    </Marker>
  );
}

// Custom marker icons based on color
const GreenIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const RedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = GreenIcon;

export default function Mapa() {
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroBairro, setFiltroBairro] = useState('');
  const [filtroMaterial, setFiltroMaterial] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);

  const handleLocateMe = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pleo seu navegador");
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
      },
      () => {
        alert("Não foi possível acessar sua localização. Verifique as permissões.");
        setLocating(false);
      }
    );
  };

  useEffect(() => {
    const carregarPontos = async () => {
      try {
        const response = await fetch('/api/data?resource_id=bab62397-be40-436a-bc9c-fe7c7bacc0c6&limit=1000');
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
        
        <div className="text-sm text-gray-500 w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-6 sm:ml-auto">
          <span>{pontosFiltrados.length} ponto(s) encontrado(s)</span>
          <button 
            onClick={handleLocateMe}
            disabled={locating}
            className="flex items-center gap-2 bg-mint/20 text-forest hover:bg-mint/40 px-4 py-2 rounded-full transition-colors text-sm font-bold w-full sm:w-auto justify-center"
          >
            <Navigation className="h-4 w-4" />
            {locating ? 'Buscando...' : 'Perto de mim'}
          </button>
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
                      <div className="bg-mint/10 p-2 rounded-md border border-mint/20 text-sm mb-3">
                        <span className="font-bold text-forest block mb-1">Materiais aceitos:</span>
                        <p className="text-gray-700">{ponto.tiporesiduo}</p>
                      </div>
                    )}
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center justify-center gap-2 w-full bg-forest text-white py-2 rounded-md hover:bg-brand-dark transition-colors font-semibold text-sm"
                    >
                      <MapPin className="h-4 w-4" />
                      Como Chegar
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          <LocationMarker position={userLocation} />
        </MapContainer>
      </div>
    </div>
  );
}

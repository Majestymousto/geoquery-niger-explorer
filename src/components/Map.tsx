import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
  regions?: Array<{
    name: string;
    coordinates: [number, number];
    data: any;
  }>;
}

const Map = ({ 
  className = "h-96", 
  center = [17.6078, 8.0817], // Niger center coordinates
  zoom = 6,
  regions = []
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(mapInstanceRef.current);

    // Custom marker icon with Niger colors
    const nigerIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="w-6 h-6 bg-gradient-to-r from-niger-green to-niger-orange rounded-full border-2 border-white shadow-lg"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add region markers
    regions.forEach(region => {
      const marker = L.marker(region.coordinates, { icon: nigerIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-lg">${region.name}</h3>
            <p class="text-sm text-gray-600">Cliquez pour plus d'informations</p>
          </div>
        `);
    });

    // Add Niger border (simplified polygon)
    const nigerBounds: [number, number][] = [
      [23.517, 0.167], // Northeast
      [23.517, 16.000], // Southeast
      [11.667, 16.000], // Southwest
      [11.667, 0.167]   // Northwest
    ];

    L.polygon(nigerBounds, {
      color: 'hsl(142, 76%, 36%)',
      weight: 2,
      opacity: 0.8,
      fillOpacity: 0.1
    }).addTo(mapInstanceRef.current);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, regions]);

  return (
    <div className={`relative rounded-lg overflow-hidden border shadow-lg ${className}`}>
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map overlay with Niger theme */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
        <h3 className="font-semibold text-sm text-foreground">République du Niger</h3>
        <p className="text-xs text-muted-foreground">Données géospatiales interactives</p>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-niger-green to-niger-orange rounded-full"></div>
            <span className="text-xs text-foreground">Régions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-niger-green opacity-50"></div>
            <span className="text-xs text-foreground">Frontières</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
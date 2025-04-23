'use client';

interface GeographicNode {
  name: string;
  x: number;  // Posición X en la cuadrícula (0-100)
  y: number;  // Posición Y en la cuadrícula (0-100)
  icon?: string;
  color?: string;
  area?: string;  // Área o zona donde está ubicado
  description?: string;
}

interface GeographicChartProps {
  data: {
    title?: string;
    nodes: GeographicNode[];
    gridLines?: number;  // Número de líneas en la cuadrícula
    areas?: Array<{
      name: string;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      color?: string;
    }>;
  };
}

export default function GeographicChart({ data }: GeographicChartProps) {
  const padding = 20;
  const gridLines = data.gridLines || 10;  // Default a 10x10

  // Función para normalizar coordenadas
  const normalizeCoordinate = (value: number, containerSize: number) => {
    return (containerSize / 2) + (value * (containerSize - 2 * padding) / 100);
  };

  // Función para generar líneas de la cuadrícula
  const generateGridLines = (size: number) => {
    const lines = [];
    for (let i = 0; i <= gridLines; i++) {
      const position = (i / gridLines) * 100;
      // Línea vertical
      lines.push(
        <line
          key={`v-${i}`}
          x1={`${position}%`}
          y1="0"
          x2={`${position}%`}
          y2="100%"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      );
      // Línea horizontal
      lines.push(
        <line
          key={`h-${i}`}
          x1="0"
          y1={`${position}%`}
          x2="100%"
          y2={`${position}%`}
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      );
    }
    return lines;
  };

  return (
    <div className="w-full aspect-square relative">
      {data.title && (
        <h2 className="text-2xl font-bold text-center mb-8">{data.title}</h2>
      )}
      
      <div className="absolute inset-0">
        {/* Cuadrícula base */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Áreas definidas */}
          {data.areas?.map((area, index) => (
            <rect
              key={`area-${index}`}
              x={`${area.startX}%`}
              y={`${area.startY}%`}
              width={`${area.endX - area.startX}%`}
              height={`${area.endY - area.startY}%`}
              fill={area.color || '#F3F4F6'}
              opacity="0.5"
            />
          ))}
          {/* Líneas de la cuadrícula */}
          {generateGridLines(100)}
        </svg>

        {/* Nodos */}
        {data.nodes.map((node, index) => {
          const defaultColors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500',
            'bg-yellow-500', 'bg-red-500', 'bg-indigo-500'
          ];
          const bgColor = node.color || defaultColors[index % defaultColors.length];
          
          return (
            <div
              key={node.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`
              }}
            >
              <div className="relative group">
                <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center shadow-lg`}>
                  {node.icon ? (
                    <span className="text-3xl text-white">{node.icon}</span>
                  ) : (
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  )}
                </div>
                {/* Tooltip con información */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-white px-3 py-2 rounded shadow-lg">
                    <p className="text-sm font-semibold">{node.name}</p>
                    {node.area && (
                      <p className="text-xs text-gray-600">{node.area}</p>
                    )}
                    {node.description && (
                      <p className="text-xs text-gray-500 mt-1">{node.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 
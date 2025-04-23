'use client';

interface RelationshipNode {
  name: string;
  x: number;
  y: number;
  icon?: string;
  color?: string;
  connections?: string[];  // nombres de otros nodos con los que se conecta
}

interface RelationshipChartProps {
  data: {
    title?: string;
    nodes: RelationshipNode[];
  };
}

export default function RelationshipChart({ data }: RelationshipChartProps) {
  // Reducir el padding para que los nodos se expandan más
  const padding = 10;
  
  // Función para normalizar valores entre -100 y 100 al rango del contenedor
  const normalizeCoordinate = (value: number, containerSize: number) => {
    // Expandir el rango un 20% más
    const expandedValue = value * 1.2;
    // Centrar en el contenedor: 50% + el valor normalizado
    return (containerSize / 2) + (expandedValue * (containerSize - 2 * padding) / 200);
  };

  return (
    <div className="w-full aspect-square relative">
      {data.title && (
        <h2 className="text-2xl font-bold text-center mb-8">{data.title}</h2>
      )}
      
      <div className="absolute inset-0">
        {/* Conexiones - ahora van primero y sin z-index alto */}
        <svg className="absolute inset-0 w-full h-full">
          {data.nodes.map(node => 
            (node.connections || []).map(targetName => {
              const target = data.nodes.find(n => n.name === targetName);
              if (!target) return null;
              
              const x1 = `${normalizeCoordinate(node.x, 100)}%`;
              const y1 = `${normalizeCoordinate(node.y, 100)}%`;
              const x2 = `${normalizeCoordinate(target.x, 100)}%`;
              const y2 = `${normalizeCoordinate(target.y, 100)}%`;
              
              return (
                <line
                  key={`${node.name}-${targetName}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#CBD5E0"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
              );
            })
          )}
        </svg>

        {/* Nodos - ahora van después y con z-index para estar encima */}
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
                left: `${normalizeCoordinate(node.x, 100)}%`,
                top: `${normalizeCoordinate(node.y, 100)}%`,
                zIndex: 1
              }}
            >
              {/* Nodo con icono */}
              <div className="relative">
                <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center shadow-lg`}>
                  {node.icon ? (
                    <span className="text-3xl text-white">{node.icon}</span>
                  ) : (
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <p className="text-sm font-semibold bg-white px-2 py-1 rounded shadow">
                    {node.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 
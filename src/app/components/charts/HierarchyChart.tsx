'use client';

interface HierarchyNode {
  name: string;
  size: number;
  icon?: string;
  color?: string;
  children?: HierarchyNode[];
}

interface HierarchyChartProps {
  data: {
    title?: string;
    root: HierarchyNode;
  };
}

export default function HierarchyChart({ data }: HierarchyChartProps) {
  const renderNode = (node: HierarchyNode, level: number = 0, isLast: boolean = true) => {
    const defaultColors = [
      'border-blue-500', 'border-green-500', 'border-purple-500',
      'border-yellow-500', 'border-red-500', 'border-indigo-500'
    ];
    const borderColor = node.color || defaultColors[level % defaultColors.length];

    return (
      <div key={node.name} className="relative">
        <div className="flex items-start">
          {/* Línea vertical desde el padre */}
          {level > 0 && (
            <div className="absolute -top-4 left-6 w-px h-4 bg-gray-300"></div>
          )}
          
          {/* Nodo actual */}
          <div className={`relative flex items-center p-4 border-2 ${borderColor} rounded-lg bg-white shadow-sm`}>
            {/* Icono */}
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
              {node.icon ? (
                <span className="text-2xl">{node.icon}</span>
              ) : (
                <div className={`w-8 h-8 ${borderColor.replace('border', 'bg')} rounded-full`}></div>
              )}
            </div>
            
            {/* Información del nodo */}
            <div>
              <h3 className="text-lg font-semibold">{node.name}</h3>
              <p className="text-gray-600">{node.size.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Hijos */}
        {node.children && node.children.length > 0 && (
          <div className="ml-12 mt-4 space-y-4">
            {node.children.map((child, index) => (
              renderNode(child, level + 1, index === node.children!.length - 1)
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {data.title && (
        <h2 className="text-2xl font-bold text-center mb-8">{data.title}</h2>
      )}
      
      <div className="space-y-6">
        {renderNode(data.root)}
      </div>
    </div>
  );
}
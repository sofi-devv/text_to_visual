'use client';

interface ComparisonItem {
  name: string;
  value: number;
  icon?: string;
  color?: string;
}

interface ComparisonChartProps {
  data: {
    title?: string;
    items: ComparisonItem[];
  };
}

export default function ComparisonChart({ data }: ComparisonChartProps) {
  // Encontrar el valor máximo para calcular porcentajes
  const maxValue = Math.max(...data.items.map(item => item.value));

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {data.title && (
        <h2 className="text-2xl font-bold text-center mb-8">{data.title}</h2>
      )}

      <div className="space-y-6">
        {data.items.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const defaultColors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
            'bg-yellow-500', 'bg-red-500', 'bg-indigo-500'
          ];
          const barColor = item.color || defaultColors[index % defaultColors.length];
          
          return (
            <div key={index} className="relative">
              {/* Cabecera con icono y nombre */}
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  {item.icon ? (
                    <span className="text-2xl">{item.icon}</span>
                  ) : (
                    <div className={`w-8 h-8 ${barColor} rounded-full`}></div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.value.toLocaleString()}</p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${barColor} transition-all duration-1000 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
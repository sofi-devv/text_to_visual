'use client';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon?: string;
}

interface TimelineChartProps {
  data: {
    title?: string;
    events: TimelineEvent[];
  };
}

export default function TimelineChart({ data }: TimelineChartProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {data.title && (
        <h2 className="text-2xl font-bold text-center mb-8">{data.title}</h2>
      )}
      
      <div className="relative">
        {/* Línea central */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
        
        {data.events.map((event, index) => (
          <div
            key={index}
            className={`flex items-center mb-8 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Contenido */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <h3 className="text-xl font-bold mb-2">{event.date}</h3>
              <h4 className="text-lg font-semibold mb-1">{event.title}</h4>
              <p className="text-gray-600">{event.description}</p>
            </div>
            
            {/* Círculo central con icono */}
            <div className="w-2/12 flex justify-center relative">
              <div className="w-12 h-12 absolute top-1/2 transform -translate-y-1/2 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center">
                {event.icon ? (
                  <span className="text-2xl">{event.icon}</span>
                ) : (
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
            
            {/* Espacio para mantener la simetría */}
            <div className="w-5/12"></div>
          </div>
        ))}
      </div>
    </div>
  );
} 
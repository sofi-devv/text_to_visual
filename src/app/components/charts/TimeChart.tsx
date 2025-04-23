'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeChartProps {
  data: {
    dataPoints: Array<{
      date: string;
      value: number;
    }>;
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
  };
}

export default function TimeChart({ data }: TimeChartProps) {
  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-medium mb-2">{data.title || 'Gráfico de Tiempo'}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data.dataPoints}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            label={{ value: data.xAxisLabel || 'Fecha', position: 'insideBottom', offset: -5 }} 
          />
          <YAxis 
            label={{ value: data.yAxisLabel || 'Valor', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
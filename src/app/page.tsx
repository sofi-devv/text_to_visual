'use client';

import { useState } from 'react';
import ChatInput from './components/ChatInput';
import GraphRenderer from './components/GraphRenderer';

export type ClassificationResult = {
  category: 'tiempo' | 'comparación' | 'jerarquía' | 'relación' | 'geografía';
  parameters: any;
};

export default function Home() {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      
      if (!response.ok) throw new Error('Error en la clasificación');
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Clasificador y Visualizador de Gráficos</h1>
        
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              Categoría: <span className="text-blue-500">{result.category}</span>
            </h2>
            <div className="border rounded-md p-4 bg-white shadow-md">
              <GraphRenderer result={result} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
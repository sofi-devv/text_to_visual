'use client';

import { ClassificationResult } from '../page';
import TimeChart from './charts/TimeChart';
import ComparisonChart from './charts/ComparisonChart';
import HierarchyChart from './charts/HierarchyChart';
import RelationshipChart from './charts/RelationshipChart';
import TimelineChart from './charts/TimelineChart';
import GeographicChart from './charts/GeographicChart';

interface GraphRendererProps {
  result: ClassificationResult;
}

export default function GraphRenderer({ result }: GraphRendererProps) {
  // Si los datos son de tipo timeline, usar el TimelineChart
  if (result.parameters?.isTimeline) {
    return <TimelineChart data={result.parameters} />;
  }

  // Para otros tipos de gráficos
  switch (result.category) {
    case 'tiempo':
      return <TimeChart data={result.parameters} />;
    case 'comparación':
      return <ComparisonChart data={result.parameters} />;
    case 'jerarquía':
      return <HierarchyChart data={result.parameters} />;
    case 'relación':
      return <RelationshipChart data={result.parameters} />;
    case 'geografía':
      return <GeographicChart data={result.parameters} />;
    default:
      return <div>Tipo de gráfico no soportado</div>;
  }
} 
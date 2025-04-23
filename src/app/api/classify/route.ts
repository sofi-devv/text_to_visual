import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    const prompt = `
      Analiza el siguiente texto y determina qué tipo de visualización necesita.
      
      Texto: "${message}"
      
      Genera una respuesta en formato JSON siguiendo una de estas estructuras según el tipo de visualización:

      1. Para LÍNEA DE TIEMPO:
      {
        "category": "tiempo",
        "parameters": {
          "isTimeline": true,
          "title": "Título descriptivo",
          "events": [
            {
              "date": "Fecha específica",
              "title": "Título del evento",
              "description": "Descripción detallada",
              "icon": "📄"  // Emoji relevante
            }
          ]
        }
      }

      2. Para COMPARACIÓN:
      {
        "category": "comparación",
        "parameters": {
          "title": "Título descriptivo",
          "items": [
            {
              "name": "Nombre del elemento",
              "value": 100,
              "icon": "💼",  // Emoji relevante
              "color": "bg-blue-500"  // Opcional
            }
          ]
        }
      }

      3. Para JERARQUÍA:
      {
        "category": "jerarquía",
        "parameters": {
          "title": "Título descriptivo",
          "root": {
            "name": "Nodo principal",
            "size": 100,
            "icon": "🏢",  // Emoji relevante
            "children": [
              {
                "name": "Subnodo",
                "size": 50,
                "icon": "👥"
              }
            ]
          }
        }
      }

      4. Para RELACIÓN:
      {
        "category": "relación",
        "parameters": {
          "title": "Título descriptivo",
          "nodes": [
            {
              "name": "Nodo 1",
              "x": 0,    // Valores entre -100 y 100 para mejor distribución
              "y": 0,    // Valores entre -100 y 100 para mejor distribución
              "icon": "💡",
              "color": "bg-blue-500",  // Color opcional
              "connections": ["Nodo 2"]
            },
            {
              "name": "Nodo 2",
              "x": 50,   // Ejemplo de posición a la derecha
              "y": -50,  // Ejemplo de posición arriba
              "icon": "🔧",
              "connections": ["Nodo 3"]
            },
            {
              "name": "Nodo 3",
              "x": -50,  // Ejemplo de posición a la izquierda
              "y": 50,   // Ejemplo de posición abajo
              "icon": "📊",
              "connections": ["Nodo 1"]
            }
          ]
        }
      }

      5. Para GEOGRAFÍA:
      {
        "category": "geografía",
        "parameters": {
          "title": "Título descriptivo",
          "gridLines": 10,  // Opcional: número de líneas en la cuadrícula
          "areas": [
            {
              "name": "Área 1",
              "startX": 0,   // Porcentaje (0-100)
              "startY": 0,   // Porcentaje (0-100)
              "endX": 50,    // Porcentaje (0-100)
              "endY": 50,    // Porcentaje (0-100)
              "color": "#E5E7EB"  // Color opcional
            }
          ],
          "nodes": [
            {
              "name": "Ubicación 1",
              "x": 25,      // Porcentaje (0-100)
              "y": 25,      // Porcentaje (0-100)
              "icon": "📍",  // Emoji relevante
              "area": "Área 1",
              "description": "Descripción de la ubicación"
            }
          ]
        }
      }
    `;
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "4o-mini",
      response_format: { type: "json_object" }
    });
    
    const response = JSON.parse(completion.choices[0].message.content || '{}');
    
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}
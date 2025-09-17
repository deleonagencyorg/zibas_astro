// src/services/participationService.ts

// Asegúrate de que tus variables de entorno estén disponibles
const API_HOST = import.meta.env.PUBLIC_API_HOST;
const API_TOKEN = import.meta.env.PUBLIC_API_TOKEN;

interface Participation {
  id: number;
  // Define aquí la estructura completa de una participación según la respuesta de tu API
  attributes: {
    creatorName: string;
    socialMediaLink: string;
    cover: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  }
}

interface ApiResponse {
  data: Participation[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Obtiene las participaciones de una promoción específica.
 * @param promotionId - El ID de la promoción.
 * @param page - El número de página a solicitar.
 * @param pageSize - El número de items por página.
 * @returns Una promesa que se resuelve con los datos de las participaciones.
 */
export async function getParticipations(promotionId: number, page: number = 1, pageSize: number = 10): Promise<ApiResponse> {
  const url = `${API_HOST}/v1/auth/participations?promotionId=${promotionId}&page=${page}&pageSize=${pageSize}`;
  
  console.log('[ParticipationService] Fetching participations from:', url);

  if (!API_HOST || !API_TOKEN) {
    console.error('[ParticipationService] Error: PUBLIC_API_HOST o PUBLIC_API_TOKEN no están definidas en las variables de entorno.');
    throw new Error('Variables de entorno no configuradas.');
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': API_TOKEN, // Enviando el token sin 'Bearer'
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[ParticipationService] Error ${response.status}:`, errorBody);
      throw new Error(`Error al obtener las participaciones: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    console.log('[ParticipationService] Received data:', data);
    return data;

  } catch (error) {
    console.error('[ParticipationService] Ha ocurrido un error en el fetch:', error);
    throw error;
  }
}

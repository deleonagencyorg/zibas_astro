// Servicio para manejar las operaciones de suscripción a newsletter
// Este servicio utiliza las variables de entorno para conectar con la API externa

/**
 * Interface para representar la respuesta de la API
 */
interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

/**
 * Interface para representar los datos de suscripción
 */
interface SubscribeData {
  email: string;
  // Se pueden añadir más campos en el futuro si es necesario
}

/**
 * Clase para manejar las operaciones de suscripción
 */
export class SubscribeService {
  private apiHost: string;
  private subscribeEndpoint: string;

  constructor() {
    // Usar las variables de entorno definidas en .env
    this.apiHost = import.meta.env.PUBLIC_CONTACT_API_HOST || '';
    this.subscribeEndpoint = import.meta.env.PUBLIC_SUSCRIBE_FROM_PATH || '';
  }

  /**
   * Envía una solicitud de suscripción al endpoint especificado
   * @param data Datos de suscripción (email)
   * @returns Promesa con la respuesta de la API
   */
  async subscribe(data: SubscribeData): Promise<ApiResponse> {
    try {
      // Verificar que las variables de entorno estén configuradas
      if (!this.apiHost || !this.subscribeEndpoint) {
        console.error('Error: Variables de entorno no configuradas correctamente');
        return {
          success: false,
          message: 'Error de configuración del servidor'
        };
      }

      // Construir la URL completa para la petición
      const url = `${this.apiHost}${this.subscribeEndpoint}`;
      
      // Realizar la petición POST
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Procesar la respuesta
      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          data: result
        };
      } else {
        // Manejar errores HTTP
        const errorText = await response.text();
        console.error('Error en la suscripción:', errorText);
        return {
          success: false,
          message: `Error al procesar la suscripción: ${response.status}`
        };
      }
    } catch (error) {
      // Manejar excepciones
      console.error('Error al enviar la suscripción:', error);
      return {
        success: false,
        message: 'Error de conexión al servicio'
      };
    }
  }
}

// Exportar una instancia única del servicio para su uso en toda la aplicación
export const subscribeService = new SubscribeService();

// Función helper para hacer más fácil el uso desde componentes
export async function submitSubscription(email: string): Promise<ApiResponse> {
  return await subscribeService.subscribe({ email });
}

import type { ContactFormData, ContactFormResponse } from '../types';
import { validateFile } from '../validations';

// Countries and their departments data
export const countriesData = {
  'Guatemala': [
    'Guatemala', 'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula',
    'El Progreso', 'Escuintla', 'Huehuetenango', 'Izabal', 'Jalapa',
    'Jutiapa', 'Petén', 'Quetzaltenango', 'Quiché', 'Retalhuleu',
    'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez',
    'Totonicapán', 'Zacapa'
  ],
  'El Salvador': [
    'Ahuachapán', 'Cabañas', 'Chalatenango', 'Cuscatlán', 'La Libertad',
    'La Paz', 'La Unión', 'Morazán', 'San Miguel', 'San Salvador',
    'San Vicente', 'Santa Ana', 'Sonsonate', 'Usulután'
  ],
  'Honduras': [
    'Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés',
    'El Paraíso', 'Francisco Morazán', 'Gracias a Dios', 'Intibucá',
    'Islas de la Bahía', 'La Paz', 'Lempira', 'Ocotepeque', 'Olancho',
    'Santa Bárbara', 'Valle', 'Yoro'
  ],
  'Nicaragua': [
    'Boaco', 'Carazo', 'Chinandega', 'Chontales', 'Estelí', 'Granada',
    'Jinotega', 'León', 'Madriz', 'Managua', 'Masaya', 'Matagalpa',
    'Nueva Segovia', 'Río San Juan', 'Rivas', 'Región Autónoma del Atlántico Norte',
    'Región Autónoma del Atlántico Sur'
  ],
  'Costa Rica': [
    'San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'
  ],
  'República Dominicana': [
    'Distrito Nacional', 'Azua', 'Baoruco', 'Barahona', 'Dajabón', 'Duarte',
    'Elías Piña', 'El Seibo', 'Espaillat', 'Hato Mayor', 'Hermanas Mirabal',
    'Independencia', 'La Altagracia', 'La Romana', 'La Vega', 'María Trinidad Sánchez',
    'Monseñor Nouel', 'Monte Cristi', 'Monte Plata', 'Pedernales', 'Peravia',
    'Puerto Plata', 'Samaná', 'San Cristóbal', 'San José de Ocoa', 'San Juan',
    'San Pedro de Macorís', 'Sánchez Ramírez', 'Santiago', 'Santiago Rodríguez',
    'Santo Domingo', 'Valverde'
  ]
};

class ContactService {
  private baseUrl: string;

  constructor() {
    // Get API base URL from environment or use default
    this.baseUrl = import.meta.env.PUBLIC_API_BASE_URL || '/api';
  }

  /**
   * Submit contact form with multipart/form-data support
   */
  async submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
    try {
      // Handle "Enviar Hoja de vida" redirect case
      if (formData.contactReason === 'Enviar Hoja de vida') {
        window.location.href = 'https://www.dinant.com/buscamos-talento-como-tu/';
        return { success: true, message: 'Redirecting to careers page...' };
      }

      // Validate file if present
      if ('file' in formData && formData.file) {
        const fileValidation = validateFile(formData.file);
        if (!fileValidation.valid) {
          return {
            success: false,
            message: fileValidation.error || 'Invalid file'
          };
        }
      }

      // Create FormData for multipart submission
      const multipartData = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'file' && value instanceof File) {
            multipartData.append('file', value);
          } else {
            multipartData.append(key, String(value));
          }
        }
      });

      // Submit to API
      const response = await fetch(`${this.baseUrl}/contact`, {
        method: 'POST',
        body: multipartData,
        // Don't set Content-Type header, let browser set it with boundary
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        message: result.message || 'Formulario enviado exitosamente',
        data: result.data
      };

    } catch (error) {
      console.error('Contact form submission error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error al enviar el formulario'
      };
    }
  }

  /**
   * Get departments for a specific country
   */
  getDepartmentsByCountry(country: string): string[] {
    return countriesData[country as keyof typeof countriesData] || [];
  }

  /**
   * Get all available countries
   */
  getAvailableCountries(): string[] {
    return Object.keys(countriesData);
  }

  /**
   * Validate form data before submission
   */
  validateFormData(formData: Partial<ContactFormData>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic validation
    if (!formData.contactReason) errors.push('Contact reason is required');
    if (!formData.country) errors.push('Country is required');
    if (!formData.department) errors.push('Department is required');
    if (!formData.fullName) errors.push('Full name is required');
    if (!formData.email) errors.push('Email is required');

    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Invalid email format');
    }

    // File validation if present
    if ('file' in formData && formData.file) {
      const fileValidation = validateFile(formData.file);
      if (!fileValidation.valid) {
        errors.push(fileValidation.error || 'Invalid file');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const contactService = new ContactService();

// Export class for testing
export { ContactService };

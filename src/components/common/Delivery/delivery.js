/**
 * Delivery Section Logic
 * Handles country detection and delivery app display
 */

// Función para detectar país usando nuestra API con geoip-lite
async function detectCountry() {
  try {
    // Verificar si hay un parámetro en la URL para forzar un país (para testing)
    const urlParams = new URLSearchParams(window.location.search);
    const forceCountry = urlParams.get('country');
    
    let apiUrl = '/api/country';
    if (forceCountry) {
      apiUrl += `?force=${forceCountry}`;
    }
    
    // Usar nuestro endpoint API que utiliza geoip-lite
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.country) {
      return data.country;
    } else {
      throw new Error('No country detected by geoip-lite');
    }
  } catch (error) {
    
    // Fallback 1: ipapi.co
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_name;
    } catch (fallbackError1) {
      
      // Fallback 2: api.country.is
      try {
        const response = await fetch('https://api.country.is/');
        const data = await response.json();
        const countryMap = {
          'HN': 'Honduras',
          'GT': 'Guatemala',
          'SV': 'El Salvador',
          'NI': 'Nicaragua',
          'CR': 'Costa Rica',
          'DO': 'Dominican Republic'
        };
        const countryName = countryMap[data.country] || data.country;
        return countryName;
      } catch (fallbackError2) {
        return null;
      }
    }
  }
}

// Función para mostrar apps de delivery según el país detectado
function showDeliveryApps(detectedCountry, deliveryApps) {
  const loadingElement = document.getElementById('delivery-loading');
  const contentElement = document.getElementById('delivery-content');
  
  // Verificar que los elementos existan
  if (!loadingElement || !contentElement) {
    return;
  }

  // Limpiar contenido anterior
  contentElement.innerHTML = '';

  // Buscar si hay app para el país detectado
  const userCountryApp = detectedCountry ? 
    deliveryApps.find(app => app.country.toLowerCase() === detectedCountry.toLowerCase()) : 
    null;

  let appsToShow = [];
  let showCountryIndicator = true;

  if (userCountryApp) {
    // Si hay app para el país del usuario, solo mostrar esa
    appsToShow = [userCountryApp];
    showCountryIndicator = false;
  } else {
    // Si no hay app para el país o no se detectó país, mostrar todas
    appsToShow = deliveryApps;
    showCountryIndicator = true;
  }

  // Crear una tarjeta para cada app a mostrar
  appsToShow.forEach(app => {
    const appCard = document.createElement('div');
    appCard.className = `text-center transition-all duration-300 hover:scale-105`;
    
    appCard.innerHTML = `
      <div class="relative">
        <a href="${app.app_url}" target="_blank" rel="noopener noreferrer" >
        <img src="${app.app_icon}" alt="Logo de ${app.app_name}" class="w-40 h-40 bg-white mx-auto mb-4 rounded-full object-cover shadow-lg p-4">
        ${showCountryIndicator ? `<p class="text-sm text-gray-600 mb-4 bg-white">Disponible en <span class="font-semibold text-secondary">${app.country}</span></p>` : ''}
        </a>
       
      </div>
    `;
    
    contentElement.appendChild(appCard);
  });

  // Ajustar el grid según la cantidad de apps
  if (appsToShow.length === 1) {
    contentElement.className = 'flex justify-center max-w-sm mx-auto';
  } else {
    contentElement.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl';
  }

  // Ocultar loading y mostrar contenido
  loadingElement.classList.add('hidden');
  contentElement.classList.remove('hidden');
}

// Función principal de inicialización
async function initializeDelivery(deliveryApps) {
  const detectedCountry = await detectCountry();
  showDeliveryApps(detectedCountry, deliveryApps);
}

// Exportar funciones para uso global
window.DeliveryModule = {
  initializeDelivery,
  detectCountry,
  showDeliveryApps
};

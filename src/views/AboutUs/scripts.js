// Intersection Observer para efectos interactivos en la timeline
function initializeTimelineObserver() {
  // Configuración del Intersection Observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: '-30% 0px -30% 0px', // Activar cuando el elemento esté en el centro de la pantalla
    threshold: 0.3 // Al menos 30% del elemento debe ser visible
  };

  // Callback que se ejecuta cuando cambia la intersección
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      const timelineItem = entry.target;
      
      if (entry.isIntersecting) {
        // Remover clase active de todos los elementos
        document.querySelectorAll('.timeline-item').forEach(item => {
          item.classList.remove('active');
        });
        
        // Agregar clase active al elemento actual
        timelineItem.classList.add('active');
        
        // Log para debugging (opcional)
        const year = timelineItem.getAttribute('data-year');
        console.log(`Timeline item ${year} is now active`);
      }
    });
  };

  // Verificar que los elementos existen antes de crear el observer
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timelineItems.length === 0) {
    console.log('Timeline items not found, retrying in 100ms...');
    setTimeout(initializeTimelineObserver, 100);
    return;
  }

  // Crear el observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observar todos los elementos de la timeline
  timelineItems.forEach(item => {
    observer.observe(item);
  });

  console.log(`Timeline observer initialized with ${timelineItems.length} items`);

  // Cleanup cuando se navega fuera de la página
  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
}

// Múltiples puntos de inicialización para garantizar funcionamiento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTimelineObserver);
} else {
  // DOM ya está cargado
  initializeTimelineObserver();
}

// Backup: inicializar después de que la ventana esté completamente cargada
window.addEventListener('load', () => {
  // Solo reinicializar si no hay elementos activos
  if (!document.querySelector('.timeline-item.active')) {
    setTimeout(initializeTimelineObserver, 200);
  }
});
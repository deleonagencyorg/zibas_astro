// Intersection Observer para efectos interactivos en la timeline
document.addEventListener('DOMContentLoaded', function() {
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

  // Crear el observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observar todos los elementos de la timeline
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    observer.observe(item);
  });

  // Cleanup cuando se navega fuera de la página
  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
});
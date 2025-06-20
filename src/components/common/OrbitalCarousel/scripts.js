/**
 * Inicializa el comportamiento interactivo del carrusel orbital
 * Maneja los eventos de hover para pausar/reanudar la animación
 */
export function initOrbitalCarousel() {
  const products = document.querySelectorAll('.orbital-product');
  
  products.forEach(product => {
    product.addEventListener('mouseenter', () => {
      // Ralentizar la animación al pasar el mouse
      if (product instanceof HTMLElement) {
        product.style.animationPlayState = 'paused';
      }
    });
    
    product.addEventListener('mouseleave', () => {
      // Reanudar la animación
      if (product instanceof HTMLElement) {
        product.style.animationPlayState = 'running';
      }
    });
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initOrbitalCarousel);

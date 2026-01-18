// Este archivo se ejecutará solo en el cliente
// Inicialización del carrusel con Swiper
function initCarousel() {
  // Esperar un momento para asegurar que todo esté cargado
  setTimeout(() => {
    try {
      const swiper = new Swiper('.swiper-container.main-carousel', {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        on: {
          init: function() {
          }
        }
      });
      
      // Forzar update después de carga completa
      window.addEventListener('load', () => {
        swiper.update();
      });
    } catch (error) {
    }
  }, 500);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCarousel);

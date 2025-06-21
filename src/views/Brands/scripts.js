document.addEventListener('DOMContentLoaded', () => {
  // Fix para las imágenes que no cargan
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.src = '/images/brands/placeholder.jpg';
    });
  });
  
  // Animación para las tarjetas de marcas
  const brandCards = document.querySelectorAll('.brand-card');
  
  if (brandCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    brandCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Funcionalidad del carrusel de marcas
  const carousel = document.querySelector('.brands-icons-carousel');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const brandIcons = document.querySelectorAll('.brand-icon-circle');
  
  if (carousel && prevBtn && nextBtn && brandIcons.length > 0) {
    // Calcular el ancho de desplazamiento (aproximadamente 2-3 íconos)
    const scrollAmount = brandIcons[0].offsetWidth * 2 + 16; // Ancho de 2 íconos + gap
    
    // Función para desplazar a la izquierda
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Función para desplazar a la derecha
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Función para manejar la visibilidad de los botones de navegación
    function updateNavButtonsVisibility() {
      // Mostrar/ocultar botón previo según la posición de scroll
      prevBtn.style.opacity = carousel.scrollLeft <= 10 ? '0.5' : '1';
      
      // Mostrar/ocultar botón siguiente según si hemos llegado al final
      const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;
      nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
    }
    
    // Actualizar visibilidad de botones al cargar y al hacer scroll
    updateNavButtonsVisibility();
    carousel.addEventListener('scroll', updateNavButtonsVisibility);
    window.addEventListener('resize', updateNavButtonsVisibility);
    
    // Asegurar que los íconos de marca sean accesibles con teclado
    brandIcons.forEach(icon => {
      icon.setAttribute('tabindex', '0');
      icon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          icon.click();
        }
      });
    });
  }
});

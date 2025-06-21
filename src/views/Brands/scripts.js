document.addEventListener('DOMContentLoaded', () => {
  // Fix para las imágenes que no cargan
  const images = document.querySelectorAll('img');
  const placeholderUrl = 'https://snack.yummiespromociones.com/snacksyummies/placeholder.webp';
  
  images.forEach(img => {
    // Evitar bucle infinito: solo aplicar el manejador de error si la imagen no es ya el placeholder
    img.addEventListener('error', function() {
      if (!this.src.includes('placeholder')) {
        this.src = placeholderUrl;
        this.classList.add('placeholder-image');
      }
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
  
  // Funcionalidad para los carruseles de productos
  initProductsCarousels();
});

// Función para inicializar todos los carruseles de productos
function initProductsCarousels() {
  const productCarousels = document.querySelectorAll('.products-carousel');
  
  productCarousels.forEach(carousel => {
    const carouselId = carousel.id;
    const slidesContainer = carousel.querySelector('.products-carousel-inner');
    const slides = carousel.querySelectorAll('.product-slide');
    const prevButton = carousel.querySelector('.prev-product');
    const nextButton = carousel.querySelector('.next-product');
    
    // Filtrar slides válidos (con imágenes que se cargan correctamente)
    const validSlides = Array.from(slides).filter(slide => slide.dataset.valid !== 'false');
    
    if (!slidesContainer || validSlides.length <= 1) {
      // Si no hay slides válidos o solo hay uno, ocultar los botones de navegación
      if (prevButton) prevButton.style.display = 'none';
      if (nextButton) nextButton.style.display = 'none';
      if (validSlides.length === 0) {
        // Si no hay slides válidos, ocultar todo el carousel
        carousel.style.display = 'none';
      }
      return;
    }
    
    let currentIndex = 0;
    const totalSlides = validSlides.length;
    
    // Función para actualizar la posición del carrusel
    function updateCarouselPosition() {
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Función para ir a la siguiente diapositiva
    function goToNextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarouselPosition();
    }
    
    // Función para ir a la diapositiva anterior
    function goToPrevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarouselPosition();
    }
    
    // Añadir event listeners a los botones
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        stopAutoplay(); // Detener autoplay al usar navegación manual
        goToPrevSlide();
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        stopAutoplay(); // Detener autoplay al usar navegación manual
        goToNextSlide();
      });
    }
    
    // Hacer que las diapositivas sean accesibles con teclado
    slides.forEach((slide, index) => {
      slide.setAttribute('tabindex', '0');
      slide.setAttribute('aria-label', `Producto ${index + 1} de ${totalSlides}`);
      slide.setAttribute('role', 'group');
      
      // Permitir navegación con teclado
      slide.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrevSlide();
        }
      });
    });
    
    // Configuración para cambiar automáticamente las diapositivas solo en hover
    const autoplayInterval = 3000; // 3 segundos
    let autoplayTimer = null;
    
    function startAutoplay() {
      // Asegurarse de detener cualquier intervalo existente primero
      stopAutoplay();
      // Iniciar nuevo intervalo
      autoplayTimer = setInterval(goToNextSlide, autoplayInterval);
    }
    
    function stopAutoplay() {
      // Verificar si el timer existe antes de limpiarlo
      if (autoplayTimer !== null) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }
    
    // No iniciar autoplay por defecto
    // Solo iniciar cuando el usuario hace hover
    carousel.addEventListener('mouseenter', startAutoplay);
    carousel.addEventListener('mouseleave', stopAutoplay);
    
    // Para dispositivos táctiles, iniciar autoplay al tocar y detener al soltar
    carousel.addEventListener('touchstart', startAutoplay, { passive: true });
    carousel.addEventListener('touchend', stopAutoplay);
    
    // Iniciar autoplay cuando se hace focus en algún elemento del carrusel
    carousel.addEventListener('focusin', startAutoplay);
    carousel.addEventListener('focusout', stopAutoplay);
  });
}

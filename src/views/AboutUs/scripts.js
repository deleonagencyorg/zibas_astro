// Animations for About Us page
document.addEventListener('DOMContentLoaded', function() {
  // Fade in animation for content sections
  const contentSections = document.querySelectorAll('.about-us-content > *');
  
  // Apply initial styles
  contentSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
  });
  
  // Animate sections with a delay
  let delay = 100;
  contentSections.forEach(section => {
    setTimeout(() => {
      section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, delay);
    delay += 100;
  });
  
  // Animar la línea vertical del timeline al hacer scroll
  const timelineLines = document.querySelectorAll('.timeline-line');
  const timelineItems = document.querySelectorAll('.history-item');
  
  // Función para verificar si un elemento está visible en el viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Función para animar la línea cuando se hace scroll
  function animateTimelineOnScroll() {
    timelineItems.forEach((item, index) => {
      if (isElementInViewport(item)) {
        // Obtener la línea asociada a este item
        const line = item.querySelector('.timeline-line');
        if (line) {
          // Calcular la altura basada en la posición del elemento en el viewport
          const itemHeight = item.offsetHeight;
          const viewportPosition = item.getBoundingClientRect().top;
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          
          // Calcular qué porcentaje del elemento es visible
          const visiblePercentage = Math.min(1, Math.max(0, (windowHeight - viewportPosition) / itemHeight));
          
          // Establecer la altura de la línea
          line.style.height = `${Math.max(200, itemHeight * visiblePercentage)}px`;
        }
      }
    });
  }
  
  // Inicializar la animación de la línea
  window.addEventListener('scroll', animateTimelineOnScroll);
  window.addEventListener('resize', animateTimelineOnScroll);
  
  // Ejecutar una vez al cargar para elementos ya visibles
  setTimeout(animateTimelineOnScroll, 300);
  
  // Animate content sections on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-us-content p');
    
    elements.forEach((el, index) => {
      // Add animation classes with staggered delay
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  };
  
  // Initialize animations
  setTimeout(animateOnScroll, 500);
});

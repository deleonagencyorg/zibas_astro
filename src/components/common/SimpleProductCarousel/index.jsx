import React, { useState, useEffect } from 'react';
import './styles.css';

/**
 * A simple 3D-like carousel for products
 */
export default function SimpleProductCarousel({ products = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  if (!products || products.length === 0) {
    return <div className="no-products">No products available</div>;
  }
  
  return (
    <div className="simple-carousel-container">
      <div className="carousel-viewport">
        {products.map((product, index) => {
          // Calculate position: -1 = left, 0 = center, 1 = right
          let position = index - activeIndex;
          
          // Handle wrapping for continuous carousel effect
          if (position < -1) {
            position += products.length;
          } else if (position > 1) {
            position -= products.length;
          }
          
          return (
            <div 
              key={product.id || index}
              className={`carousel-slide ${position === 0 ? 'active' : ''}`}
              style={{
                transform: `translateX(${position * 100}%) scale(${position === 0 ? 1 : 0.8})`,
                zIndex: position === 0 ? 2 : 1,
                opacity: Math.abs(position) > 1 ? 0 : 1
              }}
            >
              <div className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.title || product.alt || 'Product'} 
                    className="product-image"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="carousel-controls">
        <button 
          className="carousel-arrow carousel-arrow-left" 
          onClick={prevSlide}
          aria-label="Previous product"
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        
        <button 
          className="carousel-arrow carousel-arrow-right" 
          onClick={nextSlide}
          aria-label="Next product"
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

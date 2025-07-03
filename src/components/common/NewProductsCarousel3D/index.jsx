import React from 'react';
import { Carousel } from '3d-react-carousal';
import './styles.css';

/**
 * 3D Carousel component for displaying new products
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product objects
 * @param {boolean} props.autoplay - Whether to autoplay the carousel
 * @param {number} props.interval - Autoplay interval in milliseconds
 * @param {boolean} props.arrows - Whether to show navigation arrows
 * @param {function} props.onSlideChange - Callback function when slide changes
 */
export default function NewProductsCarousel3D({ 
  products, 
  autoplay = true, 
  interval = 3000, 
  arrows = true,
  onSlideChange = () => {}
}) {
  if (!products || products.length === 0) {
    return <div className="no-products">No products available</div>;
  }

  // Create slides from products
  const slides = products.map((product, index) => (
    <div key={index} className="product-slide">
      <div className="product-card">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title || 'Product'} 
            className="product-image"
          />
        </div>
     
      </div>
    </div>
  ));

  // Handle slide change
  const handleSlideChange = (index) => {
    if (onSlideChange && typeof onSlideChange === 'function') {
      onSlideChange(index);
    }
  };

  return (
    <div className="new-products-carousel-3d">
      <Carousel
        slides={slides}
        autoplay={autoplay}
        interval={interval}
        arrows={arrows}
        onSlideChange={handleSlideChange}
      />
    </div>
  );
}

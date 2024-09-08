import React, { useContext, useRef, useEffect, useState } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'
import arrowIcon from 'A:/food_purchased_frontend only/frontend/src/assets/arrow.png'; 

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);
  const exploreMenuRef = useRef(null);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const exploreMenu = exploreMenuRef.current;

    // Handle wheel scroll to trigger horizontal scrolling
    const handleScroll = (e) => {
      e.preventDefault();
      exploreMenu.scrollLeft += e.deltaY;
    };

    // Check if the user is at the end of the list
    const handleScrollPosition = () => {
      const { scrollLeft, scrollWidth, clientWidth } = exploreMenu;
      // Check if we've scrolled to the end of the list
      if (scrollLeft + clientWidth >= scrollWidth) {
        setIsAtEnd(true);
      } else {
        setIsAtEnd(false);
      }
    };

    exploreMenu.addEventListener('wheel', handleScroll);
    exploreMenu.addEventListener('scroll', handleScrollPosition);

    return () => {
      exploreMenu.removeEventListener('wheel', handleScroll);
      exploreMenu.removeEventListener('scroll', handleScrollPosition);
    };
  }, []);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="explore-menu-list" ref={exploreMenuRef}>
        {menu_list.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            key={index}
            className='explore-menu-list-item'
          >
            <img src={item.menu_image} className={category === item.menu_name ? "active" : ""} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      {/* Arrow indicating more menu items */}
      <div className={`explore-menu-arrow ${isAtEnd ? 'hidden' : ''}`}>
        <img src={arrowIcon} alt="Scroll for more" />
        {/* <p> -- </p> */}
      </div>

      {/* <hr /> */}
    </div>
  );
}

export default ExploreMenu;

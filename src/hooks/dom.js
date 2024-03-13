import { useRef, useEffect, useState } from 'react';

export const useClickOutside = (callback) => {
    const ref = useRef();

    useEffect(() => {
      const handleClick = (event) => {
        if(ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }

      document.addEventListener('click', handleClick, true);

      return () => {
          document.removeEventListener('click', handleClick, true);
      }
    }, [ref]);

    return ref;
}

export const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}
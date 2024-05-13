import { useEffect } from 'react';

// Define the useClickOutside hook with proper TypeScript annotations
const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted: boolean = false; // Explicitly declare as boolean

    const listener = (event: MouseEvent | TouchEvent) => {
      // Only call handler if click was outside, started outside, and the component was mounted
      if (
        !startedInside &&
        startedWhenMounted &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        handler(event);
      }
    };

    const validateEventStart = (event: MouseEvent | TouchEvent) => {
      // Check if the ref is currently mounted and if the event started inside
      startedWhenMounted = ref.current != null; // Ensure this is a boolean
      startedInside = ref.current
        ? ref.current.contains(event.target as Node)
        : false;
    };

    // Attach event listeners
    document.addEventListener('mousedown', validateEventStart);
    document.addEventListener('touchstart', validateEventStart);
    document.addEventListener('click', listener);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('mousedown', validateEventStart);
      document.removeEventListener('touchstart', validateEventStart);
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]); // Dependencies on ref and handler
};

export default useClickOutside;

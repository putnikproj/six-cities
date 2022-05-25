import { useEffect, useRef } from 'react';

export const usePrevious = <T>(newValue: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = newValue;
  }, [newValue]);
  return ref.current;
};

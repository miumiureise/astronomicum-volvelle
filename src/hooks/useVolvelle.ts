import { useState, useCallback } from 'react';

export function useVolvelle(initialRotations: Record<string, number>) {
  const [rotations, setRotations] = useState(initialRotations);

  const rotate = useCallback((layerId: string, angle: number) => {
    setRotations(prev => ({
      ...prev,
      [layerId]: (prev[layerId] || 0) + angle,
    }));
  }, []);

  const reset = useCallback(() => {
    setRotations(initialRotations);
  }, [initialRotations]);

  return { rotations, rotate, reset };
}

export interface VolvelleLayer {
  id: string;
  type: 'disk' | 'pointer';
  zIndex: number;
  initialRotation: number;
  label: string;
  description: string;
  color?: string;
}

export interface Annotation {
  id: string;
  layerId: string;
  text: string;
  position: { x: number; y: number }; // Normalized 0-1
}

export interface PageDefinition {
  id: string;
  title: string;
  latinTitle: string;
  description: string;
  backgroundColor: string;
  layers: VolvelleLayer[];
  annotations: Annotation[];
}

import { PageDefinition } from '../types/volvelle';

export const DRACONIS_PAGE: PageDefinition = {
  id: 'draconis',
  title: 'The Dragon Volvelle (Lunar Nodes)',
  latinTitle: 'De Nodo Draconis',
  description: 'Used to determine the position of the lunar nodes—the two points where the Moon\'s orbit intersects the ecliptic. In Renaissance astronomy, these points were symbolized by the "Dragon": the Head (Caput Draconis) and the Tail (Cauda Draconis).',
  backgroundColor: '#f4e4bc',
  layers: [
    {
      id: 'base_plate',
      type: 'disk',
      zIndex: 0,
      initialRotation: 0,
      label: 'Fixed Page (Base)',
      description: 'The stationary page containing the zodiacal circle and calendar dates.',
    },
    {
      id: 'dragon_disk',
      type: 'disk',
      zIndex: 1,
      initialRotation: 0,
      label: 'Dragon Disk',
      description: 'Rotating disk featuring the Dragon, representing the movement of the lunar nodes.',
      color: '#d4af37',
    },
    {
      id: 'node_pointer',
      type: 'pointer',
      zIndex: 2,
      initialRotation: 0,
      label: 'Node Indicator',
      description: 'Movable pointer used to mark a specific point of interest.',
      color: '#a52a2a',
    },
  ],
  annotations: [
    { id: 'ann_caput', layerId: 'dragon_disk', text: 'Caput Draconis: Ascending Node', position: { x: 0.5, y: 0.3 } },
    { id: 'ann_cauda', layerId: 'dragon_disk', text: 'Cauda Draconis: Descending Node', position: { x: 0.5, y: 0.7 } },
  ],
};

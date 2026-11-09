import React from 'react';
import { VolvelleLayer as LayerType } from '../types/volvelle';

interface Props {
  layer: LayerType;
  rotation: number;
  isStudyMode: boolean;
  isActive: boolean;
}

export const VolvelleLayer: React.FC<Props> = ({ layer, rotation, isStudyMode, isActive }) => {
  const isDisk = layer.type === 'disk';
  
  return (
    <g 
      transform={`rotate(${rotation}, 500, 500)`}
      className={`transition-colors duration-300 ${isActive ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      {isDisk ? (
        <g>
          {/* The disk body */}
          <circle 
            cx="500" 
            cy="500" 
            r="400" 
            fill="url(#parchmentGradient)" 
            stroke="#8b7d6b" 
            strokeWidth="2" 
            className={isStudyMode ? 'stroke-renaissance-gold' : ''}
          />
          {/* Renaissance style markings */}
          <circle cx="500" cy="500" r="380" fill="none" stroke="#8b7d6b" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Example markings for the Dragon disk */}
          {layer.id === 'dragon_disk' && (
            <>
              <text x="500" y="200" textAnchor="middle" className="fill-ink font-serif italic text-xs">Caput Draconis</text>
              <text x="500" y="800" textAnchor="middle" className="fill-ink font-serif italic text-xs">Cauda Draconis</text>
              <path d="M 500 200 L 500 250" stroke="currentColor" strokeWidth="2" className="text-renaissance-red" />
              <path d="M 500 800 L 500 750" stroke="currentColor" strokeWidth="2" className="text-renaissance-red" />
            </>
          )}
        </g>
      ) : (
        <g>
          {/* The pointer */}
          <path 
            d="M 500 500 L 500 150" 
            stroke={layer.color || '#000'} 
            strokeWidth="4" 
            strokeLinecap="round" 
            markerEnd="url(#arrowhead)"
          />
          <circle cx="500" cy="500" r="10" fill={layer.color || '#000'} />
        </g>
      )}
      
      {isStudyMode && (
        <text 
          x="500" 
          y="520" 
          textAnchor="middle" 
          className="fill-renaissance-blue font-sans text-[10px] font-bold uppercase"
          transform={`rotate(${-rotation}, 500, 500)`}
        >
          {layer.label}
        </text>
      )}
    </g>
  );
};

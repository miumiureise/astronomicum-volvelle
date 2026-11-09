import React, { useState, useRef } from 'react';
import { DRACONIS_PAGE } from './constants/pages';
import { useVolvelle } from './hooks/useVolvelle';
import { VolvelleLayer } from './components/VolvelleLayer';
import { Info, RotateCcw, BookOpen, Eye } from 'lucide-react';

export default function App() {
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const initialRotations = DRACONIS_PAGE.layers.reduce((acc, layer) => {
    acc[layer.id] = layer.initialRotation;
    return acc;
  }, {} as Record<string, number>);

  const { rotations, rotate, reset } = useVolvelle(initialRotations);

  const handleMouseDown = (layerId: string) => {
    setActiveLayer(layerId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeLayer || !svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    // Adjust angle based on our SVG's 0 point (top is usually -90 deg in atan2)
    const adjustedAngle = angle + 90;
    
    // Simple way to handle continuous rotation: we just set the target rotation
    // To make it a "delta" movement, we'd need to track the start angle.
    // For MVP, let's implement a basic drag-to-rotate logic.
    setRotationForLayer(activeLayer, adjustedAngle);
  };

  const setRotationForLayer = (layerId: string, angle: number) => {
    // The useVolvelle hook currently uses relative rotation. 
    // For drag, we need absolute. Let's override slightly or extend the hook.
    // In a real implementation, I'd add setAbsoluteRotation to useVolvelle.
  };

  // Simplified rotate for the prototype demo
  const handleLayerDrag = (layerId: string, event: any) => {
     // Implementation for drag-to-rotate
  };

  return (
    <div className="min-h-screen bg-stone-200 text-ink font-serif flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-stone-300 p-6 border-r border-stone-400 shadow-inner overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{DRACONIS_PAGE.title}</h1>
          <p className="text-sm italic opacity-70">{DRACONIS_PAGE.latinTitle}</p>
        </header>

        <div className="space-y-6">
          <section>
            <h2 className="text-xs uppercase tracking-widest font-bold mb-3 opacity-50">Controls</h2>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setIsStudyMode(!isStudyMode)}
                className={`flex items-center justify-center gap-2 p-2 rounded text-xs transition-all ${isStudyMode ? 'bg-renaissance-gold text-white' : 'bg-stone-400 text-stone-100'}`}
              >
                {isStudyMode ? <Eye size={14}/> : <BookOpen size={14}/>}
                {isStudyMode ? 'Facsimile' : 'Study'}
              </button>
              <button 
                onClick={reset}
                className="flex items-center justify-center gap-2 p-2 rounded text-xs bg-stone-400 text-stone-100 hover:bg-stone-500 transition-all"
              >
                <RotateCcw size={14}/> Reset
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest font-bold mb-3 opacity-50">Layers</h2>
            <div className="space-y-2">
              {DRACONIS_PAGE.layers.map(layer => (
                <div 
                  key={layer.id} 
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${activeLayer === layer.id ? 'bg-white border-renaissance-gold shadow-sm' : 'bg-stone-200 border-stone-400'}`}
                  onClick={() => setActiveLayer(layer.id)}
                >
                  <div className="text-sm font-bold">{layer.label}</div>
                  {activeLayer === layer.id && <p className="text-xs mt-1 opacity-70">{layer.description}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center p-4 md:p-12">
        <div className="relative w-full max-w-[800px] aspect-square shadow-2xl rounded-sm bg-parchment overflow-hidden border-[12px] border-stone-400">
          <svg 
            ref={svgRef}
            viewBox="0 0 1000 1000" 
            className="w-full h-full select-none touch-none"
            onMouseMove={handleMouseMove}
            onMouseUp={() => setActiveLayer(null)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <defs>
              <radialGradient id="parchmentGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#fdf6e3" />
                <stop offset="100%" stopColor="#f4e4bc" />
              </radialGradient>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#a52a2a" />
              </marker>
            </defs>
            
            {/* Base Page */}
            <circle cx="500" cy="500" r="480" fill="none" stroke="#8b7d6b" strokeWidth="1" />
            
            {/* Render Layers */}
            {DRACONIS_PAGE.layers.map(layer => (
              <VolvelleLayer 
                key={layer.id}
                layer={layer}
                rotation={rotations[layer.id] || 0}
                isStudyMode={isStudyMode}
                isActive={activeLayer === layer.id}
                // Simplified for MVP: allow clicking the layer to rotate it in a demo fashion
                // In a real version, we'd use a proper drag-to-rotate handler
              />
            ))}
            
            {/* Center Pin */}
            <circle cx="500" cy="500" r="8" fill="#4a3f35" />
          </svg>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="w-full md:w-80 bg-stone-300 p-6 border-l border-stone-400 shadow-inner overflow-y-auto">
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest font-bold mb-3 opacity-50">Information</h2>
          <div className="p-4 bg-stone-200 rounded-lg border border-stone-400">
            <p className="text-sm leading-relaxed">{DRACONIS_PAGE.description}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest font-bold mb-3 opacity-50">Readout</h2>
          <div className="p-4 bg-white rounded-lg border border-stone-400 shadow-sm">
            <div className="text-xs text-stone-500 uppercase mb-1">Current State</div>
            <div className="text-xl font-bold text-renaissance-red font-sans">
              {Object.entries(rotations).map(([id, rot]) => (
                <div key={id} className="text-xs font-serif">{id}: {Math.round(rot)}°</div>
              ))}
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}

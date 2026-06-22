// src/App.jsx
import { onMount } from 'solid-js';
import './App.css';

function App() {
  let canvasRef;
  let ctx;
  let isDrawing = false;

  onMount(() => {
    // Setup high-performance 2D context
    ctx = canvasRef.getContext('2d', { alpha: false });
    
    // Make canvas fill the entire screen
    canvasRef.width = window.innerWidth;
    canvasRef.height = window.innerHeight;

    // Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
    
    // Set digital ink styles
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
  });

  // --- Pointer Event Handlers for Zero-Latency Input ---
  const startDrawing = (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    // Use pointer events to handle multi-touch and stylus pressure smoothly
    e.preventDefault(); 
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing = false;
    ctx.closePath();
  };

  // --- Feature Placeholders ---
  const handleUploadSelfie = () => {
    console.log("Trigger image import onto canvas...");
  };

  const handleAddAccessory = () => {
    console.log("Load draggable SVGs (e.g., caps, beanies, bangs)...");
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* The Render Surface */}
      <canvas
        ref={canvasRef}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerOut={stopDrawing}
        style={{ "touch-action": "none" }} // Prevents native browser scrolling
      />

      {/* Panel-Friendly UI (Anchored to the bottom for reachability) */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '15px',
        padding: '15px 25px',
        background: '#222',
        "border-radius": '12px',
        "box-shadow": '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <button class="tool-btn">Pen</button>
        <button class="tool-btn">Eraser</button>
        <div style={{ width: '2px', background: '#444', margin: '0 10px' }}></div>
        <button class="tool-btn" onClick={handleUploadSelfie}>Upload Portrait</button>
        <button class="tool-btn" onClick={handleAddAccessory}>Add Style Assets</button>
      </div>

    </div>
  );
}

export default App;
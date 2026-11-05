import React from 'react';

/**
 * Componente reutilizable del Scroll Kit Medieval.
 * Envuelve cualquier contenido con el rollo superior, listón rojo y rollo inferior.
 */
export default function PergaminoBox({ children, className = '', bodyClassName = '', showRibbon = true }) {
  return (
    <div className={`pergamino-wrapper ${className}`}>
      <div className="rollo-superior">
        {showRibbon && <div className="liston-rojo"></div>}
      </div>
      <div className={`pergamino-cuerpo ${bodyClassName}`}>
        {children}
      </div>
      <div className="rollo-inferior"></div>
    </div>
  );
}
import { useRef } from 'react';
import { useGetCharacterDetailQuery } from '../../../../tanstack-query/use-get-character-detail';

// Hook personalizado para controlar la lógica del detalle de un personaje
export const useCharacterDetailController = () => {
  // Obtener detalles del personaje, cómics, error y estado de carga de la consulta
  const { detail, comics, error, isLoading } = useGetCharacterDetailQuery();

  // Referencias para el contenedor de cómics y el estado de arrastre
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Manejar el evento de mouse down para iniciar el arrastre
  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      isDragging.current = true;
      startX.current = e.pageX - containerRef.current.offsetLeft;
      scrollLeft.current = containerRef.current.scrollLeft;
    }
  };

  // Manejar el evento de mouse move para arrastrar el contenedor
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Manejar el evento de mouse up para finalizar el arrastre
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Manejar el evento de mouse leave para finalizar el arrastre
  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Retornar los estados, referencias y funciones necesarias para el componente
  return {
    detail,
    comics,
    error,
    isLoading,
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  };
};

import { FC } from 'react';

// Define las propiedades del componente AlertMessage
type AlertMessageProps = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

// Componente funcional AlertMessage
export const AlertMessage: FC<AlertMessageProps> = ({ message, type }) => {
  return (
    <div role="alert" className={`c-alert c-alert--${type}`}>
      {message}
    </div>
  );
};

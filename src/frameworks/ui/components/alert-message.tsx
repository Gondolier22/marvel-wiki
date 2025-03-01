import { FC } from 'react';

type AlertMessageProps = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
};
export const AlertMessage: FC<AlertMessageProps> = ({ message, type }) => {
  return (
    <div role="alert" className={`c-alert c-alert--${type}`}>
      {message}
    </div>
  );
};

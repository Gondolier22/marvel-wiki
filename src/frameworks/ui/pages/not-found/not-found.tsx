import { FC } from 'react';
import { AlertMessage } from '../../components/alert-message';

const NotFound: FC = () => {
  return (
    <div>
      <AlertMessage message="404 - The content can not be found" type="warning" />
    </div>
  );
};

export default NotFound;

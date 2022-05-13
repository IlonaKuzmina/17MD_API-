import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Page404.module.scss';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="row center-xs">
      <div className="col-xs-12 col-md-8">
        <div className={styles.error__container}>
          <span
            className={styles.error__text}
          >
            The page you are looking for doesn&apos;t exist or has been moved!

          </span>
          <button
            className="button"
            onClick={() => navigate('/home')}
          >
            Return to the home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page404;

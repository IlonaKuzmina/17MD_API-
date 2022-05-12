import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page404.scss';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="row center-xs">
      <div className="col-xs-12 col-md-8">
        <div className="error__container">

          <span
            className="error__text"
          >
            The page you are looking for doesn&apos;t exist or has been moved!

          </span>
          <button
            className="characters__card--button"
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

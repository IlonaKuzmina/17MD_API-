/* eslint-disable camelcase */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { LocationL } from '../Modals/LocationModal';
import './LocationPage.scss';

const EpisodesPage = () => {
  const [locations, setLocations] = useState<LocationL[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMesagge, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const getLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location');
      setLocations(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations().then();
  }, []);

  return (
    <div>
      <div className="row center-xs">
        <div className="col-xs-12">
          <div className="text__box">
            <span>l</span>
            <span>o</span>
            <span>c</span>
            <span>a</span>
            <span>t</span>
            <span>i</span>
            <span>o</span>
            <span>n</span>
          </div>
        </div>
      </div>

      {loading && <Loader />}
      {errorMesagge && <span className="error__message">{errorMesagge}</span>}

      <div className="row center-xs">
        <div className="col-xs-11 col-md-11">
          <div className="locations__container">
            { locations && locations.map(({
              id, name, type, url, dimension,
            }) => (
              <div
                className="locations__cards"
                key={id}
              >
                <h3>
                  {name}
                </h3>
                <br />
                <span>
                  Type:
                  {' '}
                  {type}
                </span>
                <br />
                <span>
                  Dimension:
                  {' '}
                  {dimension}
                </span>
                <button
                  className="episodes__card--button"
                  onClick={() => navigate(`/location/${id}`)}
                >
                  Read more
                </button>
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodesPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Character } from '../Modals/CharactersModal';
import './CharactersPage.scss';
import Loader from '../../components/Loader/Loader';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMesagge, setErrorMessage] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('');
  const navigate = useNavigate();

  const getCharacters = async () => {
    setLoading(true);
    const params = activeFilter === 'all' ? '' : `?status=${activeFilter}`;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${params}`);
      setCharacters(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'The information you requested was not found!' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not axios error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters().then();
  }, []);

  useEffect(() => {
    getCharacters().then();
  }, [activeFilter]);

  const setColorToCard = (status:string) => {
    const notDeadColor = status === 'Alive' ? '#0baa18' : '';
    return status === 'Dead' ? '#dd4646' : notDeadColor;
  };

  return (
    <div className="characters__wrapper">
      <div className="text__box">
        <span>C</span>
        <span>H</span>
        <span>A</span>
        <span>R</span>
        <span>A</span>
        <span>C</span>
        <span>T</span>
        <span>E</span>
        <span>R</span>
        <span>s</span>
      </div>

      <div className="button__container">
        <div className="row">
          <div className="col-xs-12">
            <button
              className="characters__card--button"
              onClick={() => setActiveFilter('')}
            >
              All

            </button>
            <button
              className="characters__card--button green"
              onClick={() => setActiveFilter('alive')}
            >
              Alive

            </button>
            <button
              className="characters__card--button red"
              onClick={() => setActiveFilter('dead')}
            >
              Dead

            </button>
            <button
              className="characters__card--button grey"
              onClick={() => setActiveFilter('unknown')}
            >
              Unknown

            </button>

          </div>
        </div>
      </div>

      <div className="characters__container">
        {loading && <Loader />}
        {errorMesagge && <span className="error__message">{errorMesagge}</span>}
        {characters && characters.map(({
          id, name, status, image,
        }) => (
          <div
            style={{ backgroundColor: setColorToCard(status) }}
            className="characters__card"
            key={id}
          >
            <img className="characters__card--image" src={image} alt="Nav bildes" />
            <div className="row">
              <div className="col-xs-12">
                <div className="characters__card--name">
                  <span>{name}</span>
                  <span>{status}</span>
                </div>

              </div>
              <div className="col-xs-12">
                <button
                  className="characters__card--button"
                  onClick={() => navigate(`/characters/${id}`)}
                >
                  Read more

                </button>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default CharactersPage;

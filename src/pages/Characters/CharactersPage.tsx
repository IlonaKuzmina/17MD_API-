import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Character, CharacterApiResponse } from '../Modals/CharactersModal';
import './CharactersPage.scss';
import Loader from '../../components/Loader/Loader';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMesagge, setErrorMessage] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  const getCharacters = async () => {
    setLoading(true);
    const charName = `?name=${inputValue}`;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${charName}`);
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
  }, [search]);

  const getAliveCharacters = async () => {
    setLoading(true);
    const charName = `?name=${inputValue}`;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?status=alive/${charName}`);
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

  const getDeadCharacters = async () => {
    setLoading(true);
    const charName = `?name=${inputValue}`;
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character/?status=dead');
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

  const getUnknownCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character/?status=unknown');
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
    setInputValue('');
  }, [search]);

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
              onClick={() => getCharacters()}
            >
              All

            </button>
            <button
              className="characters__card--button green"
              onClick={() => getAliveCharacters()}
            >
              Alive

            </button>
            <button
              className="characters__card--button red"
              onClick={() => getDeadCharacters()}
            >
              Dead

            </button>
            <button
              className="characters__card--button grey"
              onClick={() => getUnknownCharacters()}
            >
              Unknown

            </button>
            <form
              className="form__container"
              action="submit"
              onSubmit={(e) => {
                e.preventDefault();
                setInputValue('');
              }}
            >
              <input
                className="search__input"
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="How can I help You?"
              />
              <button
                className="characters__card--button"
                type="button"
                onClick={() => setSearch(inputValue)}
              >
                Search
              </button>
            </form>
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
            // eslint-disable-next-line no-nested-ternary
            style={{ backgroundColor: status === 'Dead' ? '#dd4646' : status === 'Alive' ? '#0baa18' : '' }}
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

/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Character } from '../Modals/CharactersModal';
import styles from './CharacterPage.module.scss';

const CharacterPage = () => {
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [charUrl, setCharUrl] = useState<string>(`https://rickandmortyapi.com/api/character/${id}`);
  const navigate = useNavigate();

  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(charUrl);
      setCharacter(response.data);
    } catch (error) {
      navigate('/characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCharacter();
    }
  }, []);

  useEffect(() => {
    getCharacter();
  }, [charUrl]);

  return (
    <div className="row center-xs middle-xs">
      <div className="col-xs-1">
        <button
          disabled={id === '1'}
          className={styles.card__arrow}
          onClick={() => {
            navigate(`/characters/${Number(id) - 1}`);
            setCharUrl(`https://rickandmortyapi.com/api/character/${Number(id) - 1}`);
          }}
        >
          <svg width="32" height="50" viewBox="0 0 32 50" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.08058 20.5806C-0.360194 23.0214 -0.360194 26.9786 2.08058 29.4194L20.8306 48.1694C23.2714 50.6102 27.2286 50.6102 29.6694 48.1694C32.1102 45.7286 32.1102 41.7714 29.6694 39.3306L15.3388 25L29.6694 10.6694C32.1102 8.22864 32.1102 4.27136 29.6694 1.83058C27.2286 -0.610194 23.2714 -0.610194 20.8306 1.83058L2.08058 20.5806Z"
            />
          </svg>
        </button>
      </div>
      <div className="col-xs-10 col-md-9">

        <div className={styles.card__container}>
          <div className="row center-xs">
            {loading && <Loader />}
            <div className="col-xs-12 col-md-12">
              <h1 className={styles.card__title}>
                {character?.name}
              </h1>
              <hr className={styles.card__line} />
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-xs-12 col-md-5">
              <div>
                <img className={styles.character__image} src={character?.image} alt="Nav bildes" />
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              <div className={styles.info__container}>
                <span className={styles.info__specification}>
                  <strong>Id:</strong>
                  {' '}
                  {character?.id}
                </span>
                <span className={styles.info__specification}>
                  <strong>Status:</strong>
                  {' '}
                  {character?.status}
                </span>
                <span className={styles.info__specification}>
                  <strong>Species:</strong>
                  {' '}
                  {character?.species}
                </span>
                <span className={styles.info__specification}>
                  <strong>Type:</strong>
                  {' '}
                  {character?.type}
                </span>
                <span className={styles.info__specification}>
                  <strong>Gender:</strong>
                  {' '}
                  {character?.genders}
                </span>
                <span className={styles.last__infospceification}>
                  <strong>Episode:</strong>
                  {' '}
                  {character?.episode.map((epsi) => (
                    <div key={Math.random()}>
                      {', '}
                      {epsi.slice(40)}
                    </div>
                  ))}

                </span>
              </div>
              <button
                className="button"
                onClick={() => navigate('/characters')}
              >
                Back to all characters!
              </button>
            </div>
          </div>
        </div>
        {loading && <span>Loading...</span>}
      </div>
      <div className="col-xs-1">
        <button
          disabled={id === '826'}
          className={styles.card__arrow}
          onClick={() => {
            navigate(`/characters/${Number(id) + 1}`);
            setCharUrl(`https://rickandmortyapi.com/api/character/${Number(id) + 1}`);
          }}
        >
          <svg width="32" height="50" viewBox="0 0 32 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.9194 20.5806C32.3602 23.0214 32.3602 26.9786 29.9194 29.4194L11.1694 48.1694C8.72864 50.6102 4.77136 50.6102 2.33058 48.1694C-0.110194 45.7286 -0.110194 41.7714 2.33058 39.3306L16.6612 25L2.33058 10.6694C-0.110192 8.22864 -0.110192 4.27136 2.33058 1.83058C4.77136 -0.610194 8.72864 -0.610194 11.1694 1.83058L29.9194 20.5806Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CharacterPage;

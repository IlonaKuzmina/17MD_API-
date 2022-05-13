import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Character } from '../Modals/CharactersModal';
import styles from './CharactersPage.module.scss';
import Loader from '../../components/Loader/Loader';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMesagge, setErrorMessage] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>();
  const [pages, setPages] = useState<number[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minPage, setMinPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(10);
  const navigate = useNavigate();

  const getCharacters = async () => {
    setLoading(true);
    const params = activeFilter === 'all' ? '' : `?status=${activeFilter}`;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${params}`);
      setCharacters(response.data.results);
      setPageCount(response.data.info.pages);
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
    if (pageCount) {
      const pagesArr = Array.from(Array(pageCount + 1).keys()).map((page) => page + 1);
      setPages(pagesArr);
    }
  }, [searchParams, pageCount]);

  const setColorToCard = (status:string) => {
    const notDeadColor = status === 'Alive' ? '#0baa18' : '';
    return status === 'Dead' ? '#dd4646' : notDeadColor;
  };

  return (
    <div className={styles.characters__wrapper}>
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

      <div className="row middle-xs">
        <div className="col-xs-12">
          <div className={styles.pagination__box}>
            <button
              disabled={minPage < 10}
              className={styles.card__arrow}
              onClick={() => {
                setMinPage(minPage - 10);
                setMaxPage(maxPage - 10);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 32 50" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.08058 20.5806C-0.360194 23.0214 -0.360194 26.9786 2.08058 29.4194L20.8306 48.1694C23.2714 50.6102 27.2286 50.6102 29.6694 48.1694C32.1102 45.7286 32.1102 41.7714 29.6694 39.3306L15.3388 25L29.6694 10.6694C32.1102 8.22864 32.1102 4.27136 29.6694 1.83058C27.2286 -0.610194 23.2714 -0.610194 20.8306 1.83058L2.08058 20.5806Z"
                />
              </svg>
            </button>

            {pages && pages
              .slice(pages.indexOf(minPage), pages.indexOf(maxPage + 1))
              .map((page) => (
                page === currentPage ? (
                  <button
                    key={page}
                    className={styles.pagination__items}
                    onClick={() => {
                      setSearchParams({ page: page.toString(), status: activeFilter });
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </button>
                ) : (
                  <button
                    key={page}
                    className={styles.pagination__item}
                    onClick={() => {
                      setSearchParams({ page: page.toString(), status: activeFilter });
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </button>
                )
              ))}

            <button
              disabled={pages && maxPage > pages.length}
              className={styles.card__arrow}
              onClick={() => {
                setMinPage(minPage + 10);
                setMaxPage(maxPage + 10);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 32 50" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.9194 20.5806C32.3602 23.0214 32.3602 26.9786 29.9194 29.4194L11.1694 48.1694C8.72864 50.6102 4.77136 50.6102 2.33058 48.1694C-0.110194 45.7286 -0.110194 41.7714 2.33058 39.3306L16.6612 25L2.33058 10.6694C-0.110192 8.22864 -0.110192 4.27136 2.33058 1.83058C4.77136 -0.610194 8.72864 -0.610194 11.1694 1.83058L29.9194 20.5806Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.button__container}>
        <div className="row">
          <div className="col-xs-12">
            <button
              className="button"
              onClick={() => {
                setActiveFilter('');
                setSearchParams({ status: 'all' });
                setCurrentPage(1);
                setMinPage(1);
                setMaxPage(10);
              }}
            >
              All

            </button>
            <button
              className="button green"
              onClick={() => {
                setActiveFilter('alive');
                setSearchParams({ status: 'alive' });
                setCurrentPage(1);
                setMinPage(1);
                setMaxPage(10);
              }}
            >
              Alive

            </button>
            <button
              className="button red"
              onClick={() => {
                setActiveFilter('dead');
                setSearchParams({ status: 'dead' });
                setCurrentPage(1);
                setMinPage(1);
                setMaxPage(10);
              }}
            >
              Dead

            </button>
            <button
              className="button grey"
              onClick={() => {
                setActiveFilter('unknown');
                setSearchParams({ status: 'unknown' });
                setCurrentPage(1);
                setMinPage(1);
                setMaxPage(10);
              }}
            >
              Unknown

            </button>

          </div>
        </div>
      </div>

      <div className={styles.characters__container}>
        {loading && <Loader />}
        {errorMesagge && <span className="error__message">{errorMesagge}</span>}
        {characters && characters.map(({
          id, name, status, image,
        }) => (
          <div
            style={{ backgroundColor: setColorToCard(status) }}
            className={styles.characters__card}
            key={id}
          >
            <img className={styles.card__image} src={image} alt="Nav bildes" />
            <div className="row">
              <div className="col-xs-12">
                <div className={styles.card__name}>
                  <span>{name}</span>
                  <span>{status}</span>
                </div>

              </div>
              <div className="col-xs-12">
                <button
                  className="button"
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

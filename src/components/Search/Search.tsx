import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Character } from '../../pages/Modals/CharactersModal';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [character, setCharacter] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      setCharacter(response.data.results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters().then();
  }, []);

  // const search = () => {
  //   const findCharacter = [...character].filter((char) => (char.name.includes(inputValue)));
  //   setCharacter(findCharacter);
  //   setInputValue('');
  // };

  return (
    <form
      action="submit"
    >
      <input
        className="search__input"
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="How can I help You?"
        required
      />
      {/* <button
        className="characters__card--button"
        type="button"
        onClick={search}
      >
        Search
      </button> */}
    </form>
  );
};

export default Search;

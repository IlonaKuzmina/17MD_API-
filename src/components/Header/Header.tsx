import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/base.scss';

const Header = () => {
  const getActiveLinkClassName = (isActive:boolean) => (
    isActive ? 'link link--active' : 'link'
  );

  return (
    <header>
      <nav className="navigation__container">
        <NavLink className={({ isActive }) => getActiveLinkClassName(isActive)} to="/home">Home</NavLink>
        <NavLink className={({ isActive }) => getActiveLinkClassName(isActive)} to="/about">About</NavLink>
        <NavLink className={({ isActive }) => getActiveLinkClassName(isActive)} to="/characters">Characters</NavLink>
        <NavLink className={({ isActive }) => getActiveLinkClassName(isActive)} to="/episodes">Episodes</NavLink>
        <NavLink className={({ isActive }) => getActiveLinkClassName(isActive)} to="/location">Location</NavLink>
      </nav>
    </header>
  );
};

export default Header;

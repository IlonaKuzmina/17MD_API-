import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  const b = 5;
  return (
    <div className={styles.footer__container}>
      <span>@ 2022, Antira</span>
    </div>
  );
};

export default Footer;

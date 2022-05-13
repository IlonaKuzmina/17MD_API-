import React from 'react';
import styles from './AboutPage.module.scss';

const AboutPage = () => (
  <div className={styles.about__container}>
    <div className="row center-xs">

      <div className="col-xs-12">
        <div className="text__box">
          <span>Rick</span>
          {' '}

          <span>and</span>
          {' '}

          <span>Morty</span>
        </div>
      </div>
    </div>
    <div className="row center-xs middle-xs">
      <div className="col-xs-12 col-md-7">
        <div>
          <img
            className={styles.about__image}
            src="https://static2.srcdn.com/wordpress/wp-content/uploads/2022/04/rick-morty-season-6-multiverse-future-story-bigger-e1649760424116.jpg"
            alt="Nav bildes"
          />
        </div>
      </div>

      <div className="col-xs-12 col-md-4">
        <div className={styles.info__container}>
          <h2>About</h2>
          <p className={styles.info__specification}>
            Rick, an alcoholic sociopath and scientist, lives with his daughter Beth`&apos;`s family.
            Apart from building gadgets,he takes his morally right but dimwit grandson
            Morty on absurd intergalactic adventures.
          </p>
          <span className={styles.info__specification}>
            <strong>First episode date: </strong>
            {' '}
            December 2, 2013
          </span>
          <span className={styles.info__specification}>
            <strong>Original network:</strong>
            <a
              href="https://www.adultswim.com/"
              target="blank"
            >
              {' '}
              Adult Swim
            </a>
          </span>
          <span className={styles.info__specification}>
            <strong>Producers:</strong>
            {' '}
            J. Michael Mendel (seasons 1–4); Kenny Micka (pilot)
          </span>
          <span className={styles.info__specification}>
            <strong>Genre:</strong>
            {' '}
            Animated sitcom; Science fiction; Black comedy; Adventure
          </span>
          <span className={styles.info__specification}>
            <strong>Distributor:</strong>
            {' '}
            <a href="https://www.warnerbros.com/company/divisions/television">Warner Bros. Television Distribution</a>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;

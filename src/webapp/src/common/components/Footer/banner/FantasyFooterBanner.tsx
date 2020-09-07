import React from 'react';
import './FantasyBanner.styles.scss';

const FantasyFooterBanner = () => {
  function renderTitle() {
    return <div className="title">Fantasy League </div>;
  }

  function renderSecondaryTitle() {
    return (
      <div className="secondaryTitle">
        <div className="secondaryTitle">
          Watch IPL and Play Fantasy league like never Before{' '}
        </div>
      </div>
    );
  }

  function renderDescription() {
    return (
      <div className="description">
        Show your Cricket Skill in friendly Contest! Its Free to play
        <div className="description">
          Play Fantasy with 1 team and 100 transfer
        </div>
      </div>
    );
  }

  return (
    <div className="bannerContainer">
      {renderTitle()}
      {renderSecondaryTitle()}
      {renderDescription()}
    </div>
  );
};

export default FantasyFooterBanner;

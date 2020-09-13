import React from 'react';
import './FantasyBanner.styles.scss';

const FantasyFooterBanner = () => {
  function renderTitle() {
    return <div className="title">Season Fantasy League for IPL </div>;
  }

  function renderSecondaryTitle() {
    return (
      <div className="secondaryTitle">
        <div className="secondaryTitle">
          Watch IPL and Play Fantasy against your friends
        </div>
      </div>
    );
  }

  function renderDescription() {
    return (
      <div className="description">
        Fantasy for Entertainment Only! Its Free to play
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

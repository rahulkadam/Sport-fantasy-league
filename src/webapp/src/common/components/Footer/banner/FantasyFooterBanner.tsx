import React from 'react';
import './FantasyBanner.styles.scss';

const FantasyFooterBanner = () => {
  function renderTitle() {
    return <div className="title">First Season Fantasy League for IPL </div>;
  }

  function renderSecondaryTitle() {
    return (
      <div className="secondaryTitle">
        <div className="secondaryTitle">
          Watch IPL and Play Long Season Fantasy against your friends
        </div>
      </div>
    );
  }

  function renderDescription() {
    return (
      <div className="description">
        Show your Skill in friendly Fantasy Contest! Its Free to play
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

import React from 'react';
import './FantasyBanner.styles.scss';

const FantasyPrize = () => {
  function renderTitle() {
    return <div className="title">Win Fantasy Prizes</div>;
  }

  function renderSecondaryTitle() {
    return (
      <div className="secondaryTitle">
        <div className="secondaryTitle">
          ALl IPL Public League winner will win prizes from RK Fatansy
        </div>
      </div>
    );
  }

  function renderDescription() {
    return <div className="description">Join Public league to Win Prizes!</div>;
  }

  return (
    <div className="bannerContainer">
      {renderTitle()}
      {renderSecondaryTitle()}
      {renderDescription()}
    </div>
  );
};

export default FantasyPrize;

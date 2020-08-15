import React, {Fragment} from 'react';

import './FantasyButton.styles.scss';

const FantasyButton = ({
  title,
  isDisabled,
  onClick,
}: FantasyButtonPropTypes) => {
  return (
    <Fragment>
      <button
        className="fantasyButton"
        disabled={isDisabled}
        type="button"
        onClick={onClick}>
        {title}
      </button>
    </Fragment>
  );
};

export {FantasyButton};

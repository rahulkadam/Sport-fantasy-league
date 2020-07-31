import React, {Fragment} from 'react';

import './APGButton.styles.scss';

const APGButton = ({title, isDisabled, onClick}: AstroButtonPropTypes) => {
  return (
    <Fragment>
      <button
        className="apgButton"
        disabled={isDisabled}
        type="button"
        onClick={onClick}>
        {title}
      </button>
    </Fragment>
  );
};

export {APGButton};

import React, {Fragment} from 'react';

const Logo = ({logoSource, width}: FantasyLogoPropTypes) => (
  <Fragment>
    <img src={logoSource} width={width} alt={logoSource} />
  </Fragment>
);

export {Logo};

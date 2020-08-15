import React, {Fragment} from 'react';

const Logo = ({logoSource, width}: FantasyLogoPropTypes) => (
  <Fragment>
    <img src={logoSource} width={width} />
  </Fragment>
);

export {Logo};

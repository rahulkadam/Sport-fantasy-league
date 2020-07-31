import React, {Fragment} from 'react';

const Logo = ({logoSource, width}: AstroLogoPropTypes) => (
  <Fragment>
    <img src={logoSource} width={width} />
  </Fragment>
);

export {Logo};

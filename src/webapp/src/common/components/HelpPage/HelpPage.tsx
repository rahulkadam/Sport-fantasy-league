import React from 'react';
import Helmet from 'react-helmet';
import {Container} from 'react-bootstrap';
import FantasyHelpContent from './fantasy/FantasyHelpContent';

const HelpPage = () => {
  return (
    <div>
      <Helmet>
        <title>Help - Sport Fantasy</title>
      </Helmet>
      <Container>
        <FantasyHelpContent />
      </Container>
    </div>
  );
};

export default HelpPage;

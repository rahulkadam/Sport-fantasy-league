import React, {Fragment} from 'react';
import {Button, Modal} from 'react-bootstrap';
import TransferHelp from '../transfer/TransferHelp';
import IPLPointSystems from '../points/IPLPointSystems';
import HowToPlay from '../fantasy/HowToPlay';
import {FantasyFAQ} from '../fantasy/FantasyFAQ';

const HelpModal = (props: HelpModalProps) => {
  function getTitle() {
    switch (props.type) {
      case 'points':
        return 'Point Systems';
      case 'transfers':
        return 'Transfer Count';
      case 'howtoplay':
        return 'How to Play';
      case 'faq':
        return 'Frequently Asked Question';
    }
  }

  function renderContent() {
    switch (props.type) {
      case 'points':
        return <IPLPointSystems />;
      case 'transfers':
        return <TransferHelp />;
      case 'howtoplay':
        return <HowToPlay />;
      case 'faq':
        return <FantasyFAQ />;
    }
  }

  function renderLoginModal() {
    return (
      <Modal
        show={props.show}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mainContainer"
        onHide={() => {
          props.handleClose(false);
        }}>
        <Modal.Header closeButton>
          <Modal.Title>{getTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderContent()}</Modal.Body>
        <Button
          onClick={() => {
            props.handleClose(false);
          }}>
          Cancel
        </Button>
      </Modal>
    );
  }

  return <Fragment>{renderLoginModal()}</Fragment>;
};

export default HelpModal;

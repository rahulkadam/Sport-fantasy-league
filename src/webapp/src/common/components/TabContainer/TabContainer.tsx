import React, {Fragment} from 'react';
import {Col, Nav, Row, Tab} from 'react-bootstrap';

const TabContainer = ({tabConfig, defaultKey}: TabContainerProps) => {
  function renderflexLeftColum(key: string, title: string) {
    return (
      <Fragment>
        <Nav.Item>
          <Nav.Link eventKey={key}>{title}</Nav.Link>{' '}
        </Nav.Item>
      </Fragment>
    );
  }

  function renderLeftColumnPane() {
    const element: any = [];
    const configList = tabConfig;
    configList.forEach((config: any) => {
      element.push(renderflexLeftColum(config.key, config.title));
    });
    return (
      <Fragment>
        <Nav variant="pills" className="flex-column">
          {element}
        </Nav>
      </Fragment>
    );
  }

  function renderRightPaneColumn(key: string) {
    const element: any = [];
    const configList = tabConfig;
    configList
      .filter((config: any) => config.key == key)
      .forEach((config: any) => {
        element.push(config.renderfunction);
      });
    return (
      <Fragment>
        <Tab.Pane eventKey={key}>{element}</Tab.Pane>
      </Fragment>
    );
  }

  function renderRightPage() {
    const element: any = [];
    const configList = tabConfig;
    configList.forEach((config: any) => {
      element.push(renderRightPaneColumn(config.key));
    });
    return (
      <Fragment>
        <Tab.Content>{element}</Tab.Content>
      </Fragment>
    );
  }

  function renderTabContainer() {
    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey={defaultKey}>
          <Row>
            <Col sm={3}>{renderLeftColumnPane()}</Col>
            <Col sm={9}>{renderRightPage()}</Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
  return <Fragment>{renderTabContainer()}</Fragment>;
};

export {TabContainer};

import React, {Fragment} from 'react';
import {Col, Nav, Navbar, Row, Tab} from 'react-bootstrap';
import {Route} from 'react-router-dom';

const TabContainer = ({
  tabConfig,
  defaultKey,
  activeKey,
  onSelect,
}: TabContainerProps) => {
  const tabActiveKey = activeKey;
  function defaultTabSelectAction() {
    console.log('key selected');
  }
  const tabOnSelect = onSelect || defaultTabSelectAction();
  function renderflexLeftColum(key: string, title: string) {
    return (
      <Fragment key={'Fragment' + key}>
        <Nav.Item>
          <Nav.Link key={key} eventKey={key}>
            {title}
          </Nav.Link>{' '}
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
        <Nav className="flex-column" fill>
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
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={defaultKey}
          activeKey={tabActiveKey}
          onSelect={tabOnSelect}>
          <Row>
            <Col sm={2}>{renderLeftColumnPane()}</Col>
            <Col sm={10}>{renderRightPage()}</Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
  return <Fragment>{renderTabContainer()}</Fragment>;
};

export {TabContainer};
